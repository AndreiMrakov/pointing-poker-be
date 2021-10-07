import { BadRequestError, NotFoundError } from "@/error";
import { userService } from "@/services";
import {NextFunction, Request, Response} from 'express';

class UserController {
  async getAllUsers(req: Request, res: Response,  next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFoundError('Not found room id'));
      }

      const users = await userService.getUsersByRoomId(String(roomId));

      res.json(users);
    } catch(err) {
      return next(new BadRequestError(`Not fount users. ${err}`));
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new NotFoundError('Not found room id'));
      }
      const user = await userService.getUserById(Number(id));
      
      res.json(user);
    } catch(err) {
      return next(new BadRequestError(`Not fount user. ${err}`));
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const user = await userService.createUser(name);

      res.json(user);
    } catch(err) {
      return next(new BadRequestError(`Error in create User. ${err}`))
    }
  }
};

export const userController = new UserController();
