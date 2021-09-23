import { ClientEvent } from "../utils/enums/ClientEvent";

export const isValid = (event: string, data: any) => {
  switch (event) {
    case ClientEvent.UserVote: return (data.userId && data.taskId && data.score) ? true : false;
    case ClientEvent.GameStart: return data.id ? true : false;
    case ClientEvent.GameFinish: return data.id ? true : false;
    default: return true;
  }
}
