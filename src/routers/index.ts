import { Router } from "express";
import { routerTask } from "./taskRouter";
import { messageRouter } from './messageRouter';
import { roomRouter } from "./roomRouter";
import { userRouter } from './userRouter';

export const router = Router();

router.use('/rooms', roomRouter);
router.use('/tasks', routerTask);
router.use('/messages', messageRouter);
router.use('/users', userRouter);
