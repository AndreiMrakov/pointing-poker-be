import { BadRequestError, NotFoundError } from "@/error";
import { userService } from "@/services";
import { IUser, IUserRoomRole } from "@/utils/interfaces";
import {Request, Response} from 'express';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const { roomId } = req.query;

      const users = await userService.getUsersByRoomId(roomId as string);

      const usersToFE: IUser[] = users.map(usr => {
        const temp = usr.toJSON() as IUserRoomRole;
        return {
          userId: temp.userId,
          roomId: temp.roomId,
          name: temp.user.find(usr => usr.id === temp.userId)!.name,
          role: temp.role.find(rl => rl.id === temp.roleId)!.title
        }
      })

      res.json(usersToFE);
    } catch {
      res.json(new NotFoundError(`Wrong room`));
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id as string);

      res.json(user);
    } catch {
      res.json(new NotFoundError(`Wrong user id`));
    }
  }

  async createUser(req: Request, res: Response) {
    try {
    const { name } = req.body;

    const user = await userService.createUser(name);

    res.json(user);
    } catch(err) {
      res.json(new BadRequestError(`Error in create User. ${err}`))
    }
  }
};

export const userController = new UserController();