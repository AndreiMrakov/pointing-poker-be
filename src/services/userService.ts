import { UserRoomRole } from '@/models/UserRoomRole';
import { User } from "@/models/User";
import { Role } from '@/models';

class UserService {
  async getUsersByRoomId(roomId: string) {
    const users = await UserRoomRole.findAll({
      where: {roomId},
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Role,
          attributes: ['title']
        }
      ],
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    return user;
  };

  async createUser(name: string) {
    return await User.create({name});
  }
};

export const userService = new UserService();