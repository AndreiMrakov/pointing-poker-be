import { UserRoomRole } from '@src/db/models/UserRoomRole';
import { Room } from '../db/models/Room';

class RoomService {

  async createRoom(id: number, title: string) {
    try {
      await Room.create({
        id,
        title,
      });

      return await this.getRoom(id);
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

  async leaveRoom() {
  }

  async getRoom(id: number) {
    const room = await Room.findOne({
      where: { id }
    });
    return room;
  }
};

export const roomService = new RoomService();
