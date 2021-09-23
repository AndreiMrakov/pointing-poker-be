import { RoomState } from "@/models/RoomState";
import { Room } from "@/models/Room";
import { UserScore } from "@/models/UserScore";
import { IRoom, IUserScore } from "@/utils/enums/interfaces";

// states: ['beginning', 'progress', 'finished']

class GameService {
  async userVote(payload: IUserScore) {
    const { userId, taskId, score } = payload;

    try {
      const [userScore, created] = await UserScore.findOrCreate({
        where: { userId, taskId },
        defaults: {
          score,
        },
      });
      if (created) {
        return userScore;
      } else {
        return (await UserScore.update(
          { score },
          {
            where: { id: userScore.get().id },
            returning: true,
          }
        ))[1][0];
      }
    } catch(e) {
      console.log(`UserScore was not created / updated. ${e}.`);
    }
  }

  async setStartGame(payload: IRoom) {
    const stateId = await this.getIdStateRoom("progress");
    return this.updateRoomGame(payload.id, stateId);
  }

  async setFinishGame(payload: IRoom) {
    const stateId = await this.getIdStateRoom("finished");
    return this.updateRoomGame(payload.id, stateId);
  }

  private async updateRoomGame(id: string, stateId: number) {
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
      console.log(`Room id=${id} was not updated. ${e}.`);
    }
  }

  private async getIdStateRoom(title: string) {
    try {
      const state = await RoomState.findOne({
        where: { title },
      });
      return state?.get().id;
    } catch(e) {
      console.log(`Not found state for title: ${title}. ${e}.`);
    }
  }
}

export const gameService = new GameService();
