require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sequelize } from '@/models';
import { runAllSeeds } from '@/seeders';
import { socketEventValidator } from '@/validation';
import { SocketEvent } from '@/utils/enums';
import { IUserScore, IMessage, ITask, IJoinRoom } from '@/utils/interfaces';
import { roomService, userService, messageService, taskService } from '@/services';
import { router } from '@/routers';
import { errorHandling } from '@/middleware';
import { HttpError } from '@/error';
import { leaveUser, setAdminToUser } from '@/helper';
import { logger } from '@/logger';

const LOG_LEVEL = process.env.LOG_LEVEL as string;

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Pointing Poker BE');
});

app.use(cors());
app.use(morgan(LOG_LEVEL));
app.use(express.json());
app.use('/api', router);
app.use(errorHandling);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('message', `A user ${socket.id} connected`);

  // Middleware for validation
  socket.use(([name, payload], next) => {
    if (socketEventValidator(name, payload)) {
      return next();
    }
    io.to(socket.id).emit(SocketEvent.ErrorNotData, {
      message: 'Not found payload',
    });
    return next(Error('Not found payload'));
  });

  /* ---------- Events for Room ------------ */
  socket.on(SocketEvent.RoomStart, async () => {
    const roomState = await roomService.startRoom(socket.data.roomId);
    if (roomState instanceof HttpError) {
      return logger.error(roomState);
    }
    io.to(socket.data.roomId).emit(SocketEvent.RoomStart, roomState);
  });
  socket.on(SocketEvent.RoomShow, async (id) => {
    const roomState = await roomService.restartRoom(socket.data.roomId);
    const scoreTask = await taskService.avgScore(id);
    if (roomState instanceof HttpError || scoreTask instanceof HttpError) {
      return logger.error(roomState);
    }
    io.to(socket.data.roomId).emit(SocketEvent.RoomShow, { roomState, scoreTask });
  });
  socket.on(SocketEvent.RoomFinish, async (id) => {
    const roomState = await roomService.finishRoom(socket.data.roomId);
    const resetScoreTask = await taskService.resetScoreIssue(id)
    if (roomState instanceof HttpError || resetScoreTask instanceof HttpError) {
      return logger.error(roomState);
    }
    io.to(socket.data.roomId).emit(SocketEvent.RoomFinish, roomState);
  });
  socket.on(SocketEvent.RoomJoin, async(payload: IJoinRoom) => {
    socket.data.roomId = payload.roomId;
    socket.data.userId = payload.userId;
    socket.join(payload.roomId);
    const isJoin = await userService.isJoin(payload.userId, payload.roomId);
    if (!isJoin) {
      const user = await roomService.joinRoom(payload);
      if (user instanceof HttpError) {
        return logger.error(user);
      }
      io.to(payload.roomId).emit(SocketEvent.RoomJoin, user);
      // io.to(socket.id).emit(SocketEvent.UserJoinNotify);
    } else {
      const online = await userService.setIsOnline(payload.userId, payload.roomId);
      if (online instanceof HttpError) {
        return logger.error(online);
      }
    }

  });
  socket.on(SocketEvent.RoomLeave, async(payload: IJoinRoom) => {
    const newAdmin = await setAdminToUser(payload.userId, payload.roomId);
    const user = await leaveUser(payload.userId, payload.roomId);
    newAdmin && socket.to(payload.roomId).emit(SocketEvent.RoomAdmin, newAdmin);
    socket.leave(payload.roomId);
    io.to(payload.roomId).emit(SocketEvent.RoomLeave, user);
  });
  /* ---------- End events for Room ------------ */

  /* ---------- Events for User ------------ */
  socket.on(SocketEvent.UserVote, async (payload: IUserScore) => {
    const userScore = await userService.userVote(payload);
    if (userScore instanceof HttpError) {
      return logger.error(userScore);
    }
    io.to(socket.data.roomId).emit(SocketEvent.UserVote, userScore);
  });
  socket.on(SocketEvent.UserAddRole, async (payload: IJoinRoom) => {
    const userRole = await userService.setRoleToUser(payload);
    if (userRole instanceof HttpError) {
      return logger.error(userRole);
    }
    io.to(socket.data.roomId).emit(SocketEvent.UserAddRole, userRole);
  });
  socket.on(SocketEvent.UserKick, async (payload: IJoinRoom) => {
    const userId = await userService.kickUser(payload);
    if (userId instanceof HttpError) {
      return logger.error(userId);
    }
    io.to(socket.data.roomId).emit(SocketEvent.UserKick, userId);
  });
  /* ---------- End events for User ------------ */

  /* ---------- Events for Tasks ------------ */
  socket.on(SocketEvent.TaskCreate, async (payload: ITask) => {
    const task = await taskService.createTask(payload);
    if (task instanceof HttpError) {
      return logger.error(task);
    }
    io.to(payload.roomId).emit(SocketEvent.TaskCreate, task);
  });
  socket.on(SocketEvent.TaskUpdateScore, async (payload: ITask) => {
    const task = await taskService.setScoreTask(payload);
    if (task instanceof HttpError) {
      return logger.error(task);
    }
    io.to(socket.data.roomId).emit(SocketEvent.TaskUpdateScore, task);
  });
  socket.on(SocketEvent.TaskUpdateActive, async (payload: ITask) => {
    const task = await taskService.setActiveTask(payload);
    if (task instanceof HttpError) {
      return logger.error(task);
    }
    io.to(socket.data.roomId).emit(SocketEvent.TaskUpdateActive, task);
  });
  socket.on(SocketEvent.TaskDelete, async (payload: ITask) => {
    const id = await taskService.deleteTaskById(payload);
    if (id instanceof HttpError) {
      return logger.error(id);
    }
    io.to(socket.data.roomId).emit(SocketEvent.TaskDelete, id);
  });
  /* ---------- End events for Tasks ------------ */

  /* ---------- Events for Message ------------ */
  socket.on(SocketEvent.MessageCreate, async(payload: IMessage) => {
    const message = await messageService.createMessage(payload);
    if (message instanceof HttpError) {
      return logger.error(message);
    }
    io.to(payload.roomId).emit(SocketEvent.MessageCreate, message);
  });
  /* ---------- End events for Message ------------ */

  socket.on('disconnect', async () => {
    await userService.setIsOnline(socket.data.userId, socket.data.roomId, false);
    setTimeout(async () => {
      const isOnline = await userService.isOnline(socket.data.userId, socket.data.roomId);
      if (!isOnline) {
        const newAdmin = await setAdminToUser(socket.data.userId, socket.data.roomId);
        const user = await leaveUser(socket.data.userId, socket.data.roomId);
        newAdmin && socket.to(socket.data.roomId).emit(SocketEvent.RoomAdmin, newAdmin);
        socket.to(socket.data.roomId).emit(SocketEvent.RoomLeave, user);
      }
    }, 2000)
    socket.leave(socket.data.roomId);
  });

});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await runAllSeeds();
    server.listen(PORT, () => logger.info(`Server started at localhost:${PORT}`));
  } catch(e) {
    logger.error(e);
  }
})();
