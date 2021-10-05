import { User, UserScore, Role, UserRoomRole, Task } from "@/models";
import { BadRequestError } from "@/error";
import { IUserScore, IUserRoomRole, IUser, IJoinRoom } from "@/utils/interfaces";
import { RoleTitle } from "@/utils/enums";
import { Op } from "sequelize";
import { getAvgScore, getScore } from "@/helper";

class UserService {
  async getUsersByRoomId(roomId: string) {
    const users = await UserRoomRole.findAll({
      where: { roomId },
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
        role: temp.role?.title,
        isOnline: temp.is_online,
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

  async setAdminToUser(userId: number, roomId: string) {
    try {
      const user = await UserRoomRole.findOne({
        where: { roomId,
          userId: {
            [Op.not]: userId,
          }
        },        
      });
      user?.set('roleId', RoleTitle.admin);
      user?.save();
      return user?.get('userId');
    } catch (err) {
      return new BadRequestError(`Set Role was not updated. ${err}.`);
    }
  };

  async isAdmin(userId: number, roomId: string) {
    try {
      const user = await UserRoomRole.findOne({
        where: { userId, roomId },
      });
      return user?.get('roleId') === RoleTitle.admin;
    } catch (err) {
      return new BadRequestError(`Not found role. ${err}.`);
    }
  };

  async isOnline(userId: number, roomId: string) {
    try {
      const user = await UserRoomRole.findOne({
        where: { userId, roomId },
      });
      return user?.get('is_online');
    } catch (err) {
      return new BadRequestError(`Not found role. ${err}.`);
    }
  };

  async isJoin(userId: number, roomId: string) {
    try {
      const user = await UserRoomRole.findOne({
        where: { userId, roomId },
      });

      return !!user;
    } catch (err) {
      return new BadRequestError(`Not found role. ${err}.`);
    }
  };

  async setRoleToUser({ userId, roomId, role }: IJoinRoom) {
    const roleId = role === 'admin' ? RoleTitle.admin : RoleTitle.user; 
    try {
      const [_, results] = await UserRoomRole.update(
        { roleId },
        {
          where: { userId, roomId },
          returning: true,
        }
      );

      const userModel = await User.findByPk(userId);
      const user = userModel?.toJSON() as IUser;

      return <IUser>{
        id: user.id,
        name: user.name,
        role: role,
        isOnline: true,
      }
    } catch (err) {
      return new BadRequestError(`Dont update role. ${err}.`);
    }
  }

  async resetScoreIssue(id: number) {
    try {
      await UserScore.update(
        {score: null},
        {
          where: {
            taskId: id,
          },
        },
      );
    } catch (err) {
      return new BadRequestError(`Dont reset score. ${err}.`);
    }
  }

  async avgScore(id: number) {
    try {
      const scores = await UserScore.findAll(
        {
          where: {
            taskId: id,
          },
          attributes: ['score'],
        },
      );
      
      const avgScore = getAvgScore(scores.map(score => (score.get('score') as string)));
      const score = getScore(avgScore);
      await Task.update(
        {
          avg_score: avgScore,
          score: score,
        },
        {
          where: {
            id,
          },
        },
      );

    } catch (err) {
      return new BadRequestError(`Dont update avg score. ${err}.`);
    }
  }
};

export const userService = new UserService();
