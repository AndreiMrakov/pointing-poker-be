import { messageController } from '@/controllers';
import { Router } from 'express';

export const messageRouter = Router();

messageRouter.get('/', messageController.getAllMessages);
