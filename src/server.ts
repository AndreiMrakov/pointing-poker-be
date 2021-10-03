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
import { IRoom, IUserScore, IMessage, ITask, IJoinRoom } from '@/utils/interfaces';
import { roomService, userService, messageService, taskService } from '@/services';
import { router } from '@/routers';
import { errorHandling } from '@/middleware';
import { HttpError } from '@/error';

const LOG_LEVEL = process.env.LOG_LEVEL as string;

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
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
  socket.on(SocketEvent.RoomStart, async (room: IRoom) => {
    const roomState = await roomService.startRoom(room);
    if (roomState instanceof HttpError) {
      // TODO: add logger to file
      return console.log(roomState);
    }
    socket.to(room.id).emit(SocketEvent.RoomStart, roomState);
  });
  socket.on(SocketEvent.RoomRestart, async (room: IRoom) => {
    const roomState = await roomService.restartRoom(room);
    if (roomState instanceof HttpError) {
      // TODO: add logger to file
      return console.log(roomState);
    }
    socket.to(room.id).emit(SocketEvent.RoomRestart, roomState);
  });
  socket.on(SocketEvent.RoomFinish, async (room: IRoom) => {
    const roomState = await roomService.finishRoom(room);
    if (roomState instanceof HttpError) {
      // TODO: add logger to file
      return console.log(roomState);
    }
    socket.to(room.id).emit(SocketEvent.RoomFinish, roomState);
  });
  socket.on(SocketEvent.RoomJoin, async(payload: IJoinRoom) => {
    const user = await roomService.joinRoom(payload);
    if (user instanceof HttpError) {
      // TODO: add logger to file
      return console.log(user);
    }
    socket.join(payload.roomId);
    socket.to(payload.roomId).emit(SocketEvent.RoomJoin, user);
  });
  socket.on(SocketEvent.RoomLeave, async(payload: IJoinRoom) => {
    const user = await roomService.leaveRoom(payload);
    if (user instanceof HttpError) {
      // TODO: add logger to file
      return console.log(user);
    }
    socket.leave(payload.roomId);
    socket.to(payload.roomId).emit(SocketEvent.RoomLeave, user);
  });
  /* ---------- End events for Room ------------ */

  /* ---------- Events for User ------------ */
  socket.on(SocketEvent.UserVote, async (payload: IUserScore) => {
    const userScore = await userService.userVote(payload);
    if (userScore instanceof HttpError) {
      // TODO: add logger to file
      return console.log(userScore);
    }
    socket.to(payload.roomId).emit(SocketEvent.UserVote, userScore);
  });
  /* ---------- End events for User ------------ */

  /* ---------- Events for Tasks ------------ */
  socket.on(SocketEvent.TaskCreate, async (payload: ITask) => {
    const task = await taskService.createTask(payload);
    if (task instanceof HttpError) {
      // TODO: add logger to file
      return console.log(task);
    }
    socket.to(payload.roomId).emit(SocketEvent.TaskCreate, task);
  });
  socket.on(SocketEvent.TaskUpdateScore, async (payload: ITask) => {
    const task = await taskService.setScoreTask(payload);
    if (task instanceof HttpError) {
      // TODO: add logger to file
      return console.log(task);
    }
    socket.to(payload.roomId).emit(SocketEvent.TaskUpdateScore, task);
  });
  socket.on(SocketEvent.TaskUpdateActive, async (payload: ITask) => {
    const task = await taskService.setActiveTask(payload);
    if (task instanceof HttpError) {
      // TODO: add logger to file
      return console.log(task);
    }
    socket.to(payload.roomId).emit(SocketEvent.TaskUpdateActive, task);
  });
  socket.on(SocketEvent.TaskDelete, async (payload: ITask) => {
    const id = await taskService.deleteTaskById(payload);
    if (id instanceof HttpError) {
      // TODO: add logger to file
      return console.log(id);
    }
    socket.emit(SocketEvent.TaskDelete, id);
  });
  /* ---------- End events for Tasks ------------ */

  /* ---------- Events for Message ------------ */
  socket.on(SocketEvent.MessageCreate, async(payload: IMessage) => {
    const message = await messageService.createMessage(payload);
    if (message instanceof HttpError) {
      // TODO: add logger to file
      return console.log(message);
    }
    socket.to(payload.roomId).emit(SocketEvent.MessageCreate, message);
  });
  /* ---------- End events for Message ------------ */

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await runAllSeeds();
    server.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));
  } catch(e) {
     console.log(e);
  }
})();
