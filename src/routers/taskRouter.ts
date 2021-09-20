import { taskController } from "../controllers";
import { Router } from "express";

export const routerTask = Router();

routerTask.get('/:roomId', taskController.getAllTasks);
routerTask.post('/', taskController.createTask);
routerTask.put('/score/:id', taskController.setScoreTask);
routerTask.put('/active/:id', taskController.setActiveTask);
routerTask.delete('/:id', taskController.deleteTask);
