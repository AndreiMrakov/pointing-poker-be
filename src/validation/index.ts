import { ClientEvent } from "@/utils/enums/ClientEvent";

export const isValid = (event: string, data: any) => {
  switch (event) {
    case ClientEvent.TaskCreate: return (data.title && data.roomId) ? true : false;
    case ClientEvent.TaskDelete: return data.id ? true : false;
    case ClientEvent.TaskUpdateScore: return (data.id && data.score) ? true : false;
    case ClientEvent.TaskUpdateActive: return data.id ? true : false;
    default: return true;
  }
}