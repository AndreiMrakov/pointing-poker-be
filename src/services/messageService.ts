import { Message } from '@/db/models/Message';

class MessageService {
  async getMessagesByRoomId(roomId: string) {
    const messages = await Message.findAll({
      where: {roomId}
    });

    return messages;
  }

  async createMessage(text: string, roomId: string, userId: number) {
    if(text && roomId && userId) {
      const message = await Message.create({text, roomId, userId});

      return message;
    }
    else {
      return null;
    }
  };
};

export const messageService = new MessageService();