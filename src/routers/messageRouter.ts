import { messageController } from '../controllers';
import { Router } from 'express';

export const messageRouter = Router();

messageRouter.post('/', messageController.createMessage);