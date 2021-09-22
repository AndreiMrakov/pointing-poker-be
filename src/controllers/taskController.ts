import { Request, Response } from 'express';
import { taskService } from '../services';

export class TaskController {
  static async getAllTasks(req: Request, res: Response) {
    const { roomId } = req.query;
    const tasks = await taskService.getAllTasks(String(roomId));
    res.json(tasks);
  }
}
