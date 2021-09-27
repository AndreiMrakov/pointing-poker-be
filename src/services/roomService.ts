import { BadRequestError, HttpError } from "@/error";
import { RoomState } from "@/models";
import { Room } from "@/models";
import { IRoom, IRoomState } from "@/utils/interfaces";

// states: ['beginning', 'progress', 'finished']

class RoomService {
  async setStartGame(payload: IRoom) {
    const state = await this.getStateRoom("progress");
    return this.updateRoomGame(payload.id, state);
  }

  async setRestartGame(payload: IRoom) {
    const state = await this.getStateRoom("beginning");
    return this.updateRoomGame(payload.id, state);
  }

  async setFinishGame(payload: IRoom)  {
    const state = await this.getStateRoom("finished");
    return this.updateRoomGame(payload.id, state);
  }

  private async updateRoomGame(id: string, state?: IRoomState | BadRequestError) {
    if (state instanceof HttpError) {
      return state;
    }
    try {
      await Room.update(
        { roomStateId: state?.id },
        {
          where: { id },
        }
      );

      return state;
    } catch(e) {
      return new BadRequestError(`Room id=${id} was not updated. ${e}.`);
    }
  }

  private async getStateRoom(title: string) {
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
