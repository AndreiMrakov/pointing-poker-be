import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { taskService } from "@/services";
import { ClientEvent } from "@/utils/enums/ClientEvent";
import { ServerEvent } from "@/utils/enums/ServerEvent";
import { ITask } from "@/utils/interfaces";
import { isValid } from "@/validation";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server {
  const io = new Server(httpServer, serverOptions);

  io.on("connection", (socket) => {
    socket.broadcast.emit('message', `A user ${socket.id} connected`);

    socket.use((packet, next) => {
      if (isValid(packet[0], packet[1])) {
        next();
      }
      io.to(socket.id).emit(ServerEvent.ErrorNotData, {
        message: 'Not found data',
      });
      next(Error('Not found data'));
    });

    /* ---------- Events for Tasks ------------ */
    socket.on(ClientEvent.TaskCreate, async (payload: ITask) => {
      const task = await taskService.createTask(payload);
      socket.to(payload.roomId).emit(ServerEvent.TaskCreated, task);
    });
    socket.on(ClientEvent.TaskUpdateScore, async (payload: ITask) => {
      const task = await taskService.setScoreTask(payload);
      socket.to(payload.roomId).emit(ServerEvent.TaskUpdatedScore, task);
    });
    socket.on(ClientEvent.TaskUpdateActive, async (payload: ITask) => {
      const tasks = await taskService.setActiveTask(payload);
      socket.to(payload.roomId).emit(ServerEvent.TaskUpdatedActive, tasks);
    });
    socket.on(ClientEvent.TaskDelete, async (payload: ITask) => {
      await taskService.deleteTask(payload) && socket.emit(ServerEvent.TaskDeleted);
    });
     /* ---------- End events for Tasks ------------ */

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
    });
  });

  return io;
}
