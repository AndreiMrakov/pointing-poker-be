import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { gameService } from "@/services";
import { SocketEvent } from "@/utils/enums";
import { socketEventValidator } from "@/validation";
import { IRoom, IUserScore } from "@/utils/enums/interfaces";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server {
  const io = new Server(httpServer, serverOptions);

  io.on("connection", (socket) => {
    socket.broadcast.emit('message', `A user ${socket.id} connected`);
    
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
      const game = await gameService.setStartGame(payload);
      socket.to(payload.id).emit(SocketEvent.GameStart, game);
    });
    socket.on(SocketEvent.GameFinish, async (payload: IRoom) => {
      const game = await gameService.setFinishGame(payload);
      socket.to(payload.id).emit(SocketEvent.GameFinish, game);
    });
    socket.on(SocketEvent.UserVote, async (payload: IUserScore) => {
      const userScore = await gameService.userVote(payload);
      socket.to(payload.roomId).emit(SocketEvent.UserVote, userScore);
    });
     /* ---------- End events for Game ------------ */

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
    });
  });

  return io;
}