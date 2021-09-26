import { SocketEvent } from "@/utils/enums";

export const socketEventValidator = (event: string, data: any) => {
  switch (event) {
    case SocketEvent.UserVote: return (data.userId && data.taskId && data.score);
    case SocketEvent.GameStart: return !!data.id;
    case SocketEvent.GameFinish: return !!data.id;
    default: return true;
  }
}
