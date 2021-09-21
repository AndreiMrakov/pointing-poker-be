import { messageService } from '@src/services';
import {Request, Response} from 'express';

class MessageController {
  async getAllMessages(req: Request, res: Response) {
    const { roomId } = req.params;

    const messages = await messageService.getAllMessages(roomId);

    res.json(messages);
  }

  async createMessage(req: Request, res: Response) {
    const { text, roomId } = req.body;

    const messages = await messageService.createMessage(text, roomId);

    res.json(messages);
  }
};

export const messageController = new MessageController();