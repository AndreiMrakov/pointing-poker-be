import { Router } from "express";
import { routerTask } from "./taskRouter";
import { messageRouter } from './messageRouter';

export const router = Router();

router.use('/task', routerTask);
router.use('/messages', messageRouter);
