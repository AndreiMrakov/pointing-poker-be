<<<<<<< HEAD
import { Router } from "express";
import { routerTask } from "./taskRouter";

export const router = Router();

router.use('/task', routerTask);
=======
import { Router } from 'express';
import { messageRouter } from './messageRouter';

export const router = Router();

router.use('/messages', messageRouter)
>>>>>>> 50f15fb93605c0bccea3c0206674cc63282ef06f
