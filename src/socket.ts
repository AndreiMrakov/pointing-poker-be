import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { taskService } from "./services";
import { ClientEvent } from "./utils/enums/ClientEvent";
import { ServerEvent } from "./utils/enums/ServerEvent";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server {
  const io = new Server(httpServer, serverOptions);

  io.on("connection", (socket) => {
    socket.broadcast.emit('message', `A user ${socket.id} connected`);

    /* ---------- Events for Tasks ------------ */
    socket.on(ClientEvent.TaskCreate, async (data: any) => {
      const { title, description, roomId } = data;
      const task = await taskService.createTask(title, description, roomId);
      socket.to(roomId).emit(ServerEvent.TaskCreated, task);
    });
    socket.on(ClientEvent.TaskUpdateScore, async (data: any) => {
      const { id, score, roomId } = data;
       const task = await taskService.setScoreTask(Number(id), score, roomId);
      socket.to(roomId).emit(ServerEvent.TaskUpdatedScore, task);
    });
    socket.on(ClientEvent.TaskUpdateActive, async (data: any) => {
      const { id, is_active, roomId } = data;
      const tasks = await taskService.setActiveTask(Number(id), is_active, roomId);
      socket.to(roomId).emit(ServerEvent.TaskUpdatedActive, tasks);
    });
    socket.on(ClientEvent.TaskDelete, async (data: any) => {
      const { id } = data;
      await taskService.deleteTask(Number(id)) && socket.emit(ServerEvent.TaskDeleted);
    });
     /* ---------- End events for Tasks ------------ */

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
    });
  });

  return io;
}
