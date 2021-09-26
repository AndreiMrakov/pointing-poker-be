import { SocketEvent } from "@/utils/enums/SocketEvent";

export const socketEventValidator = (event: string, data: any) => {
  switch (event) {
    case SocketEvent.TaskCreate: return (data.title && data.roomId) ? true : false;
    case SocketEvent.TaskDelete: return data.id ? true : false;
    case SocketEvent.TaskUpdateScore: return (data.id && data.score) ? true : false;
    case SocketEvent.TaskUpdateActive: return data.id ? true : false;
    default: return true;
  }
}