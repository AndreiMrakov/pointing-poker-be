import { Router } from 'express';
import { messageRouter } from './messageRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/messages', messageRouter);
router.use('/users', userRouter)