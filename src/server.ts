require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { sequelize } from '@/models';
import { runAllSeeds } from '@/seeders';
import { socketEventValidator } from '@/validation';
import { SocketEvent } from '@/utils/enums';
import { IRoom, IUserScore, IMessage, ITask } from '@/utils/interfaces';
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
  socket.use(([name, payload]: Array<any>, next: (err?: Error) => void) => {
    if (socketEventValidator(name, payload)) {
      return next();
    }
    io.to(socket.id).emit(SocketEvent.ErrorNotData, {
      message: 'Not found data',
    });
    return next(Error('Not found data'));
  });

  /* ---------- Events for Game ------------ */
  socket.on(SocketEvent.GameStart, async (payload: IRoom) => {
    try {
      const game = await roomService.setStartGame(payload);
      socket.to(payload.id).emit(SocketEvent.GameStart, game);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.GameRestart, async (payload: IRoom) => {
    try {
      const game = await roomService.setRestartGame(payload);
      socket.to(payload.id).emit(SocketEvent.GameRestart, game);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.GameFinish, async (payload: IRoom) => {
    try {
      const game = await roomService.setFinishGame(payload);
      socket.to(payload.id).emit(SocketEvent.GameFinish, game);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.UserVote, async (payload: IUserScore) => {
    try {
      const userScore = await userService.userVote(payload);
      socket.to(payload.roomId).emit(SocketEvent.UserVote, userScore);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  /* ---------- End events for Game ------------ */

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
    const result = await taskService.deleteTaskById(payload);
    if (result instanceof HttpError) {
      // TODO: add logger to file
      return console.log(result);
    }
    socket.emit(SocketEvent.TaskDelete);
  });
  /* ---------- End events for Tasks ------------ */

  /* ---------- Events for Message ------------ */
  socket.on(SocketEvent.MessageCreate, async(payload: IMessage) => {
      const {text, roomId, userId} = payload;
      try {
        const message = await messageService.createMessage(text, roomId, userId);
        socket.to(roomId).emit(SocketEvent.MessageCreated, message);
      } catch (err) {
        console.log(err);
      };
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
