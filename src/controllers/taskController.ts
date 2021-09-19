import { Request, Response } from 'express';
import { Task } from '../db/models/Task';
import { Room } from '../db/models/Room';

class TaskController {
  async getAll(req: Request, res: Response) {
    const { uuid } = req.params;

    const room = await Room.findOne({
      where: { uuid }
    });

    const tasks = await Task.findAll({
      where: { roomId: room?.getDataValue('id') }
    });

    res.json(tasks);
  }

  async createTask(req: Request, res: Response) {
    const { title, description, uuid } = req.body;

    const room = await Room.findOne({
      where: { uuid }
    });

    const count = await Task.count({
      where: { roomId: room?.getDataValue('id') }
    });

    const is_active = count === 0 ? true : false;

    const task = await Task.create({
      title,
      description,
      roomId: room?.getDataValue('id'),
      is_active,
    });

    res.json(task);
  }

  async addScore(req: Request, res: Response) {
    const { id } = req.params;
    const { score } = req.body;
    try {
      await Task.update(
        { score },
        {
          where: { id },
        }
      );
      res.status(200).json({message: 'ok'});
    } catch(e) {
      console.log(`Error update Task id=${id}: `, e);
    }
  }

  async isActive(req: Request, res: Response) {
    const { id } = req.params;
    const { is_active, uuid } = req.body;

    const room = await Room.findOne({
      where: { uuid }
    });

    try {
      await Task.update(
        { is_active: false },
        {
          where: {
            is_active: true,
            roomId: room?.getDataValue('id'),
          },
        }
      );
      await Task.update(
        { is_active },
        {
          where: { id },
        }
      );
      res.status(200).json({message: 'ok'});
    } catch(e) {
      console.log(`Error update Task id=${id}: `, e);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await Task.destroy({
        where: { id },
      });
      res.status(200).json({message: 'ok'});
    } catch(e) {
      console.log(`Error destroy Task id=${id}: `, e);
    }

  }
}

export const taskController = new TaskController();