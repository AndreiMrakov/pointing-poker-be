require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { sequelize } from '@/models';
import { runAllSeeds } from '@/seeders';
import { Server } from "socket.io";
import { socketEventValidator } from '@/validation';
import { SocketEvent } from '@/utils/enums';
import { IRoom, IUserScore } from '@/utils/interfaces';
import { roomService, userService } from '@/services';

const LOG_LEVEL = process.env.LOG_LEVEL as string;

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.use(morgan(LOG_LEVEL));

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
      return next();
    }
    io.to(socket.id).emit(SocketEvent.ErrorNotData, {
      message: 'Not found data',
    });
    return next(Error('Not found data'));
  });

  /* ---------- Events for Game ------------ */
  socket.on(SocketEvent.GameStart, async (payload: IRoom) => {
    const game = await roomService.setStartGame(payload);
    socket.to(payload.id).emit(SocketEvent.GameStart, game);
  });
  socket.on(SocketEvent.GameFinish, async (payload: IRoom) => {
    const game = await roomService.setFinishGame(payload);
    socket.to(payload.id).emit(SocketEvent.GameFinish, game);
  });
  socket.on(SocketEvent.UserVote, async (payload: IUserScore) => {
    const userScore = await userService.userVote(payload);
    socket.to(payload.roomId).emit(SocketEvent.UserVote, userScore);
  });
   /* ---------- End events for Game ------------ */

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
