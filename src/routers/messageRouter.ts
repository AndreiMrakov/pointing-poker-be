import { messageController } from '@src/controllers';
import { Router } from 'express';

export const messageRouter = Router();

messageRouter.get('/:roomId', messageController.getAllMessages);
messageRouter.post('/', messageController.createMessage);