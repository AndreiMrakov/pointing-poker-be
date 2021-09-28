import { BadRequestError, NotFoundError } from '@/error';
import { messageService } from '@/services';
import { IMessageFromDB, ISendMessage } from '@/utils/interfaces';
import {NextFunction, Request, Response} from 'express';

class MessageController {
  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFoundError('Not found room id'));
      }

      const messages = await messageService.getMessagesByRoomId(roomId as string);
      
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
      res.json(messagesToFE);
    } catch {
      return next(new BadRequestError('Wrong room'));
    }
  }
};

export const messageController = new MessageController();
