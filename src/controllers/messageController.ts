import { messageService } from '../services/messageService';
import {Request, Response} from 'express';

class MessageController {
  async createMessage(req: Request, res: Response) {
    const { text, roomId, userId } = req.body;

    const messages = await messageService.createMessage(text, roomId, userId);

    res.json(messages);
  }
};

export const messageController = new MessageController();