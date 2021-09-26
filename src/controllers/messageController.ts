import { BaseError } from '@/helpers';
import { messageService } from '@/services';
import { HttpStatusCode } from '@/utils/enums';
import {Request, Response} from 'express';


class MessageController {
  async getAllMessages(req: Request, res: Response) {
    try {
      const { roomId } = req.query;

      const messages = await messageService.getMessagesByRoomId(roomId as string);

      res.json(messages);
    } catch {
      res.json(new BaseError(`Wrong room`, HttpStatusCode.NOT_FOUND));
    }
  }
};

export const messageController = new MessageController();