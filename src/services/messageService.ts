import { BadRequestError } from '@/error';
import { Message, User } from '@/models';
import { IMessage, IMessageFromDB, ISendMessage, IUser } from '@/utils/interfaces';

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

      const tempMsg = message.toJSON() as IMessageFromDB;
      const user = await User.findByPk(tempMsg.userId);
      const tempUser = user?.toJSON() as IUser;

      const result: ISendMessage = {
        "id": tempMsg.id,
        "text": tempMsg.text,
        "date": tempMsg.createdAt,
        "userId": tempMsg.userId,
        "roomId": tempMsg.roomId,
        "name": tempUser.name,
      };

      return result;
    } catch(e) {
      return new BadRequestError(`Error in create Message. ${e}`);
    }
  };
};

export const messageService = new MessageService();
