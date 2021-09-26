import { RoomState } from "@/models";
import { Room } from "@/models";
import { IRoom, IRoomState } from "@/utils/interfaces";

// states: ['beginning', 'progress', 'finished']

class RoomService {
  async setStartGame(payload: IRoom): Promise<IRoomState | undefined> {
    const state = await this.getIdStateRoom("progress");
    return this.updateRoomGame(payload.id, state);
  }

  async setRestartGame(payload: IRoom): Promise<IRoomState | undefined> {
    const state = await this.getIdStateRoom("beginning");
    return this.updateRoomGame(payload.id, state);
  }

  async setFinishGame(payload: IRoom): Promise<IRoomState | undefined>  {
    const state = await this.getIdStateRoom("finished");
    return this.updateRoomGame(payload.id, state);
  }

  private async updateRoomGame(id: string, state?: IRoomState): Promise<IRoomState | undefined> {
    try {      
      await Room.update(
        { RoomStateId: state?.id },
        {
          where: { id },
        }
      );

      return state;
    } catch(e) {
      console.log(`Room id=${id} was not updated. ${e}.`);
    }
  }

  private async getIdStateRoom(title: string): Promise<IRoomState | undefined> {
    try {
      const state = await RoomState.findOne({
        where: { title },
      });
      return state?.toJSON() as IRoomState;
    } catch(e) {
      console.log(`Not found state for title: ${title}. ${e}.`);
    }
  }
}

export const roomService = new RoomService();
