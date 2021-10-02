import { User, UserScore, Role, UserRoomRole } from "@/models";
import { BadRequestError } from "@/error";
import { IUserScore, IUserRoomRole, IUser } from "@/utils/interfaces";

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

    const usersToFE: IUser[] = users.map(user => {
      const temp = user.toJSON() as IUserRoomRole;
      return {
        id: temp.userId,
        name: temp.user.name,
        role: temp.role.title,
        roomId: temp.roomId,
      }
    });

    return usersToFE;
  }

  async getUserById(id: number) {
    return User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });
  };

  async createUser(name: string) {
    return User.create({name});
  }

  async userVote({ userId, taskId, score }: IUserScore) {
    try {
      const [userScore, created] = await UserScore.findOrCreate({
        where: { userId, taskId },
        defaults: {
          score,
        },
      });
      if (created) {
        return userScore;
      }
      const [_, results] = await UserScore.update(
        { score },
        {
          where: { id: userScore.get().id },
          returning: true,
        }
      );
      return results[0];
    } catch(e) {
      return new BadRequestError(`UserScore was not created / updated. ${e}.`);
    }
  }
};

export const userService = new UserService();
