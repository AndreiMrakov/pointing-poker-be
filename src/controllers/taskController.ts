import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@/error';
import { taskService } from '@/services';

export class TaskController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFoundError('Not found room id'));
      }
      const tasks = await taskService.getAllTasks(String(roomId));
      res.json(tasks);
    } catch(err) {
      return next(new BadRequestError(`Wrong task. ${err}`));
    }
  }
}
