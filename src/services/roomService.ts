import { BadRequestError, HttpError } from "@/error";
import { RoomState, Room } from "@/models";
import { StateRoomTitle } from "@/utils/enums";
import { IRoom, IRoomState } from "@/utils/interfaces";

// states: ['beginning', 'progress', 'finished']

class RoomService {
  async startGame(payload: IRoom) {
    const state = await this.getStateRoom(StateRoomTitle.run);
    return this.updateRoomStateById(payload.id, state);
  }

  async restartGame(payload: IRoom) {
    const state = await this.getStateRoom(StateRoomTitle.restart);
    return this.updateRoomStateById(payload.id, state);
  }

  async finishGame(payload: IRoom)  {
    const state = await this.getStateRoom(StateRoomTitle.finish);
    return this.updateRoomStateById(payload.id, state);
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
