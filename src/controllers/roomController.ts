import { Request, Response } from 'express';
import { roomService } from '@src/services/RoomService';

class RoomController {

  async createRoom(req: Request, res: Response) {
    const { id, uuid, title } = req.body;

    const tasks = await roomService.createRoom(id, uuid, title);

    res.json(tasks);
  }

  async joinRoom() {

  }

  async leaveRoom() {

  }

  async getRoom() {

  }
};

export const roomController = new RoomController();
