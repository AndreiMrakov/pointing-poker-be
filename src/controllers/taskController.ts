import { NextFunction, Request, Response } from 'express';
import { NotFound } from '@/error';
import { taskService } from '@/services';

export class TaskController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    const { roomId } = req.query;
    if (!roomId) {
      return next(new NotFound('Not found room id'));
    }
    const tasks = await taskService.getAllTasks(String(roomId));
    res.json(tasks);
  }
}
