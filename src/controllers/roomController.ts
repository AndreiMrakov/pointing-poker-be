import { NextFunction, Request, Response } from 'express';
import { roomService } from '@/services';
import { BadRequestError, NotFoundError } from '@/error';

class RoomController {
  async createRoom(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    if (!title) {
      return next(new NotFoundError('Not found room title'));
    }
    try {
      const tasks = await roomService.createRoom(title);

      res.json(tasks);
    } catch(err) {
      return next(new BadRequestError(`Wrong room. ${err}`));
    }
  }

  async getRoom(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return next(new NotFoundError('Not found room id'));
    }
    try {
      const room = await roomService.getRoom(id);
      res.json(room);
    } catch(err) {
      return next(new BadRequestError(`Wrong room. ${err}`));
    }
  }
};

export const roomController = new RoomController();
