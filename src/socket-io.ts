import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT_SOCKET;
const FE_PORT_SOCKET = process.env.FE_PORT_SOCKET!;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [FE_PORT_SOCKET],
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('message', `A user ${socket.id} connected`);

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => console.log(`Socket-server started at localhost:${PORT}`));
