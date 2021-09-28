import { BadRequestError } from '@/error';
import { Message, User } from '@/models';
import { IMessage } from '@/utils/interfaces';

class MessageService {
  async getMessagesByRoomId(roomId: string) {
    const messages = await Message.findAll({
      where: {roomId},
      attributes: {
        exclude: ['updatedAt']
      },     
      include: {
        model: User,
        attributes: ['name'],
      }
    });

    return messages;
  }

  async createMessage({ text, roomId, userId }: IMessage) {
    try {
      const message = await Message.create({
        text,
        roomId,
        userId,
      });

      return message;
    } catch(e) {
      return new BadRequestError(`Error in create Message. ${e}`);
    }
  };
};

export const messageService = new MessageService();
