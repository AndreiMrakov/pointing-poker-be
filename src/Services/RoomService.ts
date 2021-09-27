import { RoomState } from '@/models/RoomState';
import { Task } from '@/models/Task';
import { UserRoomRole } from '@/models/UserRoomRole';
import { Room } from '@/models/Room';

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
};

export const roomService = new RoomService();
