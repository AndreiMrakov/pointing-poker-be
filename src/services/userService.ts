import { User, UserScore, Role, UserRoomRole } from "@/models";
import { BadRequestError } from "@/error";
import { IUserScore, IUserRoomRole, IUser, IJoinRoom } from "@/utils/interfaces";
import { RoleTitle } from "@/utils/enums";
import { Op } from "sequelize";

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

  async setIsOnline(userId: number, roomId: string, isOnline = true) {
    try {
      await UserRoomRole.update(
        { is_online: isOnline},
        {
          where: {
            userId,
            roomId,
          },
        },
      );
    } catch (err) {
      return new BadRequestError(`Not set online user. ${err}.`);
    }
  }

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

  async kickUser({ userId, roomId }: IJoinRoom) {
    try {
      await UserRoomRole.destroy({
        where: {
          userId,
          roomId,
        }
      });
      return userId;
    } catch (err) {
      return new BadRequestError(`Dont kick user from room. ${err}.`);
    }
  }
};

export const userService = new UserService();
