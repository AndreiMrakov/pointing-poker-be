import { UserRoomRole } from './../db/models/UserRoomRole';
import { User } from "@/db/models/User";

class UserService {
  async getUsersByRoomId(roomId: string) {
    const users = await UserRoomRole.findAll({
      where: {roomId},
    });

    return users;
  }

  async getUserById(id: string) {
    const user = await User.findAll({
      where: {id}
    });

      return user;
  };
};

export const userService = new UserService();