import { Router } from "express";
import { routerTask } from "./taskRouter";
import { messageRouter } from './messageRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/task', routerTask);
router.use('/messages', messageRouter);
router.use('/users', userRouter);

