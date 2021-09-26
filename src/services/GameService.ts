import { RoomState } from "@/models/RoomState";
import { Room } from "@/models/Room";
import { UserScore } from "@/models/UserScore";
import { IRoom, IUserScore, IRoomState } from "@/utils/enums/interfaces";

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
        return userScore.toJSON();
      } else {
        return (await UserScore.update(
          { score },
          {
            where: { id: userScore.get().id },
            returning: true,
          }
        ))[1][0].toJSON();
      }
    } catch(e) {
      console.log(`UserScore was not created / updated. ${e}.`);
    }
  }

  async setStartGame(payload: IRoom): Promise<IRoomState | undefined> {
    const state = await this.getIdStateRoom("progress");
    return this.updateRoomGame(payload.id, state, );
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

export const gameService = new GameService();
