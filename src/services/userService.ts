import { User } from "@/db/models/User";

class UserService {
  async getUsersByRoomId(roomId: string) {
    const users = await User.findAll({
      where: {roomId}
    });

    return users;
  }

  async getUserById(userId: string) {
    const user = await User.findAll({
      where: {userId}
    });

      return user;
  };
};

export const userService = new UserService();