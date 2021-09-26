require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sequelize } from '@/models';
import { runAllSeeds } from '@/seeders';
import { router } from '@/routers';
import { errorHandling } from '@/middleware';
import { SocketEvent } from '@/utils/enums';
import { taskService, messageService } from '@/services';
import { ITask, IMessage } from '@/utils/interfaces';
import { socketEventValidator } from '@/validation';

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
  socket.use((event, next) => {
    const [name, payload] = event;

    if (socketEventValidator(name, payload)) {
      return next();
    }
    io.to(socket.id).emit(SocketEvent.ErrorNotData, {
      message: 'Not found data',
    });
    next(Error('Not found data'));
  });

  /* ---------- Events for Tasks ------------ */
  socket.on(SocketEvent.TaskCreate, async (payload: ITask) => {
    try {
      const task = await taskService.createTask(payload);
      socket.emit(SocketEvent.TaskCreate, task);
    } catch (err) {
      console.log(`Error insert to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.TaskUpdateScore, async (payload: ITask) => {
    try {
      const task = await taskService.setScoreTask(payload);
      socket.emit(SocketEvent.TaskUpdateScore, task);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.TaskUpdateActive, async (payload: ITask) => {
    try {
      const tasks = await taskService.setActiveTask(payload);
      socket.to(payload.roomId).emit(SocketEvent.TaskUpdateActive, tasks);
    } catch (err) {
      console.log(`Error update to DB. ${err}.`);
    };
  });
  socket.on(SocketEvent.TaskDelete, async (payload: ITask) => {
    try {
      await taskService.deleteTask(payload) && socket.emit(SocketEvent.TaskDelete);
    } catch (err) {
      console.log(`Error delete to DB. ${err}.`);
    };
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
