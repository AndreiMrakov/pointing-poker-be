import { RoomState } from "../models/RoomState";
import { Room } from "../models/Room";

// states: ['beginning', 'progress', 'finished']

class GameService {
  async setStartGame(id: string) {
    const stateId = await this.getIdStateRoom("progress");
    return await this.updateRoomGame(id, stateId);
  }

  async setFinishGame(id: string) {
    const stateId = await this.getIdStateRoom("finished");
    return await this.updateRoomGame(id, stateId);
  }

  async updateRoomGame(id: string, stateId: number) {
    try {
      const room = await Room.update(
        { roomStateId: stateId },
        {
          where: { id },
          returning: true,
        }
      );
      return room;
    } catch(e) {
      return `Room id=${id} was not updated. ${e}.`;
    }
  }

  async getIdStateRoom(title: string) {
    try {
      const state = await RoomState.findOne({
        where: { title }
      });
      return state?.get().id;
    } catch(e) {
      return `Not found state for title: ${title}. ${e}.`;
    }
  }
}

export const gameService = new GameService();