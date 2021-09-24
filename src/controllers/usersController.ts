import { BaseError } from "@/helpers";
import { userService } from "@/services";
import { HttpStatusCode } from "@/utils/enums";
import {Request, Response} from 'express';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const { roomId } = req.query;

      const users = await userService.getUsersByRoomId(roomId as string);

      res.json(users);
    } catch {
      res.json(new BaseError(`Wrong room`, HttpStatusCode.NOT_FOUND));
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const user = await userService.getUserById(userId as string);

      res.json(user);
    } catch {
      res.json(new BaseError(`Wrong user id`, HttpStatusCode.NOT_FOUND));
    }
  }
};

export const userController = new UserController();