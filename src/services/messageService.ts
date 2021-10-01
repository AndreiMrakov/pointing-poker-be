import { BadRequestError } from '@/error';
import { Message, User } from '@/models';
import { IMessage, IMessageFromDB, ISendMessage } from '@/utils/interfaces';

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
      },
    });

    const messagesToFE: ISendMessage[] = messages.map(msg => {
      const temp = msg.toJSON() as IMessageFromDB;
      return {
        "id": temp.id,
        "text": temp.text,
        "date": temp.createdAt,
        "userId": temp.userId,
        "roomId": temp.roomId,
        "name": temp.user.name,
      };
    });

    return messagesToFE;
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
