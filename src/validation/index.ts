import { SocketEvent } from "@/utils/enums";

export const socketEventValidator = (event: string, data: any) => {
  switch (event) {
    case SocketEvent.UserVote: return (data.userId && data.taskId && data.score) ? true : false;
    case SocketEvent.GameStart: return data.id ? true : false;
    case SocketEvent.GameFinish: return data.id ? true : false;
    default: return true;
  }
}
