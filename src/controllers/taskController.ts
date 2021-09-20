import { Request, Response } from 'express';
import { taskService } from '../services';

class TaskController {
  async getAllTasks(req: Request, res: Response) {
    const { roomId } = req.params;

    const tasks = await taskService.getAllTasks(roomId);

    res.json(tasks);
  }

  async createTask(req: Request, res: Response) {
    const { title, description, roomId } = req.body;

    const tasks = await taskService.createTask(title, description, roomId);

    res.json(tasks);
  }

  async setScoreTask(req: Request, res: Response) {
    const { id } = req.params;
    const { score, roomId } = req.body;
    
    const tasks = await taskService.setScoreTask(Number(id), score, roomId);

    res.json(tasks);
  }

  async setActiveTask(req: Request, res: Response) {
    const { id } = req.params;
    const { is_active, roomId } = req.body;

    const tasks = await taskService.setActiveTask(Number(id), is_active, roomId);

    res.json(tasks);
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    
    await taskService.deleteTask(Number(id)) && res.status(200).json({message: 'ok'});
  }
}

export const taskController = new TaskController();