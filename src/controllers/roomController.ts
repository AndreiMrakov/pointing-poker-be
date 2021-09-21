import { Request, Response } from 'express';
import { roomService } from '@src/services/RoomService';

class RoomController {

  async createRoom(req: Request, res: Response) {
    const { id, title } = req.body;

    const tasks = await roomService.createRoom(id, title);

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
