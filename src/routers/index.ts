import { Router } from 'express';
import { messageRouter } from './messageRouter';
import { roomRouter } from "./roomRouter";

export const router = Router();

router.use('/room', roomRouter);
router.use('/messages', messageRouter);
