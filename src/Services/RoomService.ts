import { RoomState, Task, UserRoomRole, Room } from '@/models';
import { BadRequestError, HttpError } from '@/error';
import { RoomStateTitle } from '@/utils/enums';
import { IRoom, IRoomState } from '@/utils/interfaces';

class RoomService {
  async createRoom(title: string) {
    try {
      const room = await Room.create({
        title,
      });

      return room.toJSON();
    } catch(e) {
      console.log(`Error create room ${title}: `, e);
    }
  }

  async joinRoom(roomId: string, userId: number, roleId: number) {
    try {
      await UserRoomRole.create({
        roomId,
        userId,
        roleId
      })

      return true;
    } catch(e) {
      console.log(`Error join room: `, e);
    }
  }

  async leaveRoom(roomId: string, userId: number) {
    try {
      await UserRoomRole.destroy({
        where: { userId, roomId  },
      });
    } catch(e) {
      console.log(`Error leave room: `, e);
    }
  }

  async getRoom(id: string) {
    return await Task.findByPk(id, {
      include: RoomState,
    });
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
};

export const roomService = new RoomService();
