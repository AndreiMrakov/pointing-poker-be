import { BadRequestError, NotFoundError } from '@/error';
import { messageService } from '@/services';
import {NextFunction, Request, Response} from 'express';

class MessageController {
  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFoundError('Not found room id'));
      }

      const messages = await messageService.getMessagesByRoomId(String(roomId));
      
      res.json(messages);
    } catch(err) {
      return next(new BadRequestError('Wrong msg. ${err}'));
    }
  }
};

export const messageController = new MessageController();
