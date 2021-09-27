import { BadRequestError } from '@/error';
import { Message } from '@/models';
import { IMessage } from '@/utils/interfaces';

class MessageService {
  async getMessagesByRoomId(roomId: string) {
    const messages = await Message.findAll({
      where: {roomId}
    });

    return messages;
  }

  async createMessage({ text, roomId, roomUserId }: IMessage) {
    try {
      const message = await Message.create({
        text,
        roomId,
        userId: roomUserId,
      });

      return message;
    } catch(e) {
      return new BadRequestError(`Error in create Message. ${e}`);
    }
  };
};

export const messageService = new MessageService();
