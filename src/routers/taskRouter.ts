import { getAllTasks } from "../controllers";
import { Router } from "express";

export const routerTask = Router();

routerTask.get('/', getAllTasks);
