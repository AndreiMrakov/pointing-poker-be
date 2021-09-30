import { BadRequestError, NotFoundError } from "@/error";
import { userService } from "@/services";
import { IUserRoomRole, IUsersOfRoomToFE } from "@/utils/interfaces";
import {NextFunction, Request, Response} from 'express';

class UserController {
  async getAllUsers(req: Request, res: Response,  next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFoundError('Not found room id'));
      }

      const users = await userService.getUsersByRoomId(String(roomId));

      const usersToFE: IUsersOfRoomToFE[] = users.map(user => {
        const temp = user.toJSON() as IUserRoomRole;
        return {
          id: temp.userId,
          name: temp.user.name,
          role: temp.role.title,
          roomId: temp.roomId,
        }
      })

      res.json(usersToFE);
    } catch {
      return next(new BadRequestError(`Not fount users`));
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
    } catch {
      return next(new BadRequestError(`Not fount user`));
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
