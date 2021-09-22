import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import {
  createTask,
  deleteTask,
  setActiveTask,
  setScoreTask
} from "./controllers";
import { ClientEvent } from "./utils/enums/ClientEvent";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server {
  const io = new Server(httpServer, serverOptions);

  io.on("connection", (socket) => {
    socket.broadcast.emit('message', `A user ${socket.id} connected`);

    socket.on(ClientEvent.TaskCreate, createTask.bind(socket));
    socket.on(ClientEvent.TaskUpdateScore, setScoreTask.bind(socket));
    socket.on(ClientEvent.TaskUpdateActive, setActiveTask.bind(socket));
    socket.on(ClientEvent.TaskDelete, deleteTask.bind(socket));

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
    });
  });

  return io;
}