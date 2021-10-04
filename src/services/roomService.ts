import { RoomState, UserRoomRole, Room, User, Role, UserScore } from '@/models';
import { BadRequestError, HttpError } from '@/error';
import { RoleTitle, RoomStateTitle } from '@/utils/enums';
import { IJoinRoom, IRole, IRoom, IRoomState, IUser } from '@/utils/interfaces';

class RoomService {
  async createRoom(title: string) {
    const room = await Room.create({ title });
    const tempRoom = room.toJSON() as IRoom;
    const state = await RoomState.findByPk(tempRoom.roomStateId);
    const tempState = state?.toJSON() as IRoomState;

    const result: IRoom = {
      id: tempRoom.id,
      title: tempRoom.title,
      state: tempState.title,
      roomStateId: tempRoom.roomStateId,
    }

    return result;
  }

  async joinRoom({ roomId, userId }: IJoinRoom) {
    try {
      const count = await UserRoomRole.count({
        where: { roomId },
      });

      const roleId = !count ? RoleTitle.admin : null;

      await UserRoomRole.create({
        roomId,
        userId,
        roleId,
      });

      const userModel = await User.findByPk(userId);
      const user = userModel?.toJSON() as IUser;

      return <IUser>{
        id: user.id,
        name: user.name,
        role: roleId ? 'admin' : null,
      }
    } catch(err) {
      return new BadRequestError(`Error join to room. ${err}`);
    }
  }

  async leaveRoom({ roomId, userId }: IJoinRoom) {
    try {
      const result = await UserRoomRole.destroy({
        where: { userId, roomId  },
      });
      console.log(result)
      return !!result && await User.findByPk(userId);
    } catch(e) {
      return new BadRequestError(`Error leave User ${userId}. ${e}`);
    }
  }

  async getRoomById(id: string) {
    const room = await Room.findByPk(id);

    const tempRoom = room?.toJSON() as IRoom;
    const state = await RoomState.findByPk(tempRoom.roomStateId);
    const tempState = state?.toJSON() as IRoomState;

    const result: IRoom = {
      id: tempRoom.id,
      title: tempRoom.title,
      state: tempState.title,
      roomStateId: tempRoom.roomStateId,
    }

    return result;    
  }

  async startRoom(room: IRoom) {
    const state = await this.getRoomStateByTitle(RoomStateTitle.run);
    return this.updateRoomStateById(room.id, state);
  }

  async restartRoom(room: IRoom) {
    const state = await this.getRoomStateByTitle(RoomStateTitle.restart);
    return this.updateRoomStateById(room.id, state);
  }

  async finishRoom(room: IRoom)  {
    const state = await this.getRoomStateByTitle(RoomStateTitle.finish);
    return this.updateRoomStateById(room.id, state);
  }

  private async updateRoomStateById(id: string, state: IRoomState | BadRequestError) {
    if (state instanceof HttpError) {
      return state;
    }
    try {
      await Room.update(
        { roomStateId: state.id },
        {
          where: { id },
        }
      );

      return state;
    } catch(e) {
      return new BadRequestError(`Room id=${id} was not updated. ${e}.`);
    }
  }

  private async getRoomStateByTitle(title: string) {
    const state = await RoomState.findOne({
      where: { title },
    });
    if (state) {
      return state.toJSON() as IRoomState;
    }
    return new BadRequestError(`Not found state for title: ${title}.`);
  }
}

export const roomService = new RoomService();
