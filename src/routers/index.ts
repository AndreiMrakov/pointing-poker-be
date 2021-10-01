import { Router } from "express";
import { routerTask } from "./taskRouter";
import { messageRouter } from './messageRouter';
import { roomRouter } from "./roomRouter";
import { userRouter } from './userRouter';

export const router = Router();

router.use('/room', roomRouter);
router.use('/task', routerTask);
router.use('/messages', messageRouter);
router.use('/users', userRouter);

