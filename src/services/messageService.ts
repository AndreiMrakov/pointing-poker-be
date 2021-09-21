import { Message } from '../db/models/Message';

class MessageService {
  async getAllMessages(roomId: string) {
    const messages = await Message.findAll({
      where: {roomId}
    });

    return messages;
  }

  async createMessage(text: string, roomId: string, userId: number) {
    await Message.create({text, roomId, userId});

    return await this.getAllMessages(roomId);
  }
};

export const messageService = new MessageService();