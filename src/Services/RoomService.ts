import { Room } from '@src/db/models/Room';
import { Request, Response } from 'express';
import { AbstractDataTypeConstructor } from 'sequelize/types';

class RoomService {

  async createRoom(id: number, uuid: AbstractDataTypeConstructor, title: string) {
    try {
      await Room.create({
        id,
        uuid,
        title,
      });

      return await this.getRoom(id);
    } catch(e) {
      console.log(`Error create room ${title}: `, e);
    }
  }

  async joinRoom() {

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
