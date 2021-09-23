import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { gameService } from "./services";
import { ClientEvent } from "./utils/enums/ClientEvent";
import { ServerEvent } from "./utils/enums/ServerEvent";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server {
  const io = new Server(httpServer, serverOptions);

  io.on("connection", (socket) => {
    socket.broadcast.emit('message', `A user ${socket.id} connected`);

    /* ---------- Events for Game ------------ */
    socket.on(ClientEvent.GameStart, async (data: any) => {
      const { id } = data;
      const game = await gameService.setStartGame(id);
      socket.emit(ServerEvent.GameStarted, game);
    });
    socket.on(ClientEvent.GameFinish, async (data: any) => {
      const { id } = data;
      const game = await gameService.setFinishGame(id);
      socket.emit(ServerEvent.GameFinished, game);
    });
    socket.on(ClientEvent.UserVote, async (data: any) => {
      const { userId, taskId, score } = data;
      const userScore = await gameService.userVote(userId, taskId, score);
      socket.emit(ServerEvent.UserVoted, userScore);
    });
     /* ---------- End events for Game ------------ */

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
    });
  });

  return io;
}