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

app.use(morgan(LOG_LEVEL));
app.use(express.json());
app.use('/api', router);
app.use(cors({
  origin: '*',
}));
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
  socket.use((packet, next) => {
    if (socketEventValidator(packet[0], packet[1])) {
      next();
    }
    io.to(socket.id).emit(SocketEvent.ErrorNotData, {
      message: 'Not found data',
    });
    next(Error('Not found data'));
  });

  /* ---------- Events for Tasks ------------ */
  socket.on(SocketEvent.TaskCreate, async (payload: ITask) => {
    const task = await taskService.createTask(payload);
    socket.to(payload.roomId).emit(SocketEvent.TaskCreate, task);
  });
  socket.on(SocketEvent.TaskUpdateScore, async (payload: ITask) => {
    const task = await taskService.setScoreTask(payload);
    socket.to(payload.roomId).emit(SocketEvent.TaskUpdateScore, task);
  });
  socket.on(SocketEvent.TaskUpdateActive, async (payload: ITask) => {
    const tasks = await taskService.setActiveTask(payload);
    socket.to(payload.roomId).emit(SocketEvent.TaskUpdateActive, tasks);
  });
  socket.on(SocketEvent.TaskDelete, async (payload: ITask) => {
    await taskService.deleteTask(payload) && socket.emit(SocketEvent.TaskDelete);
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
