import { BaseError, HttpStatusCode } from '@/helpers';
import { Message } from '@/db/models/Message';

class MessageService {
  async getMessagesByRoomId(roomId: string) {
    const messages = await Message.findAll({
      where: {roomId}
    });

    return messages;
  }

  async createMessage(text: string, roomId: string, userId: number) {
    if(!text || !roomId || !userId) {
      return(new BaseError('Bad request', HttpStatusCode.BAD_REQUEST));
    }
    const message = await Message.create({text, roomId, userId});

    return message;
  }
};

export const messageService = new MessageService();