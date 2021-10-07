import { SocketEvent } from "@/utils/enums";

export const socketEventValidator = (event: string, data: any) => {
  switch (event) {
    case SocketEvent.MessageCreate: return (data.text && data.roomId && data.userId);
    case SocketEvent.UserVote: return (data.userId && data.taskId && data.score);
    case SocketEvent.RoomShow: return !!data;
    case SocketEvent.RoomFinish: return !!data;
    case SocketEvent.TaskCreate: return (data.title && data.roomId);
    case SocketEvent.TaskDelete: return !!data.id;
    case SocketEvent.TaskUpdateScore: return (data.id && data.score);
    case SocketEvent.TaskUpdateActive: return !!data.id;
    default: return true;
  }
};
