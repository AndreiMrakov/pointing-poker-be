import { Router } from "express";
import { routerTask } from "./taskRouter";

export const router = Router();

router.use('/task', routerTask);
