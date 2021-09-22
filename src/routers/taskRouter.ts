import { TaskController } from "../controllers";
import { Router } from "express";

export const routerTask = Router();

routerTask.get('/:roomId', new TaskController().getAllTasks);
