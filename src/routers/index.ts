import { Router } from 'express';
import { messageRouter } from './messageRouter';

export const router = Router();

router.use('/message', messageRouter)