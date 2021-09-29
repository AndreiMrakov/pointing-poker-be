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
          attributes: ['name', 'id'],
        },
        {
          model: Role,
          attributes: ['title', 'id']
        }]
    });

    return users;
  }

  async getUserById(id: string) {
    const user = await User.findOne({
      where: {id},
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: UserRoomRole,
        attributes: ['roomId']
      }
    });

      return user;
  };

  async createUser(name: string) {
    const user = await User.create({name});

    return user
  }
};

export const userService = new UserService();