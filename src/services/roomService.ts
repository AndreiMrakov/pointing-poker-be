import { RoomState, UserRoomRole, Room } from '@/models';
import { BadRequestError, HttpError } from '@/error';
import { RoomStateTitle } from '@/utils/enums';
import { IJoinRoom, IRoom, IRoomState } from '@/utils/interfaces';

class RoomService {
  async createRoom(title: string) {
    return Room.create({ title });
  }

  async joinRoom({ roomId, userId, roleId }: IJoinRoom) {
    try {
      const result = await UserRoomRole.create({
        roomId,
        userId,
        roleId
      });

      return userId; //or return name user?
    } catch(err) {
      return new BadRequestError(`Error join to room. ${err}`);
    }
  }

  async leaveRoom({ roomId, userId }: IJoinRoom) {
    try {
      await UserRoomRole.destroy({
        where: { userId, roomId  },
      });

      return userId; // or return name user?
    } catch(e) {
      return new BadRequestError(`Error leave User ${userId}. ${e}`);
    }
  }

  async getRoom(id: string) {
    return await Room.findByPk(id, {
      include: RoomState,
    });
    //TODO: responce norm view
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
