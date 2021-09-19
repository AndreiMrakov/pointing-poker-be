import { taskController } from "../controllers/taskController";
import { Router } from "express";

export const routerTask = Router();

routerTask.get('/:uuid', taskController.getAll);
routerTask.post('/', taskController.createTask);
routerTask.put('/score/:id', taskController.addScore);
routerTask.put('/active/:id', taskController.isActive);
routerTask.delete('/:id', taskController.delete);
