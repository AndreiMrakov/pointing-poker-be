import { messageService } from '../services/messageService';
import {Request, Response} from 'express';

class MessageController {
  async getAllMessages(req: Request, res: Response) {
    try {
      const { roomId } = req.query;

      const messages = await messageService.getAllMessages(roomId as string);

      res.json(messages);
    } catch {
      res.json('There are no messages in this room');
    }
  }
};

export const messageController = new MessageController();