import { Request, Response } from 'express';
import { roomService } from '../services/RoomService';

class RoomController {

  async createRoom(req: Request, res: Response) {
    const { id, title } = req.body;
    const tasks = await roomService.createRoom(id, title);
    res.json(tasks);
  }

  async joinRoom(req: Request, res: Response) {
    const { roomId, userId, roleId } = req.body;
    const result = await roomService.joinRoom(roomId, userId, roleId);
    res.json(result);
  }

  async leaveRoom(req: Request, res: Response) {
    const { roomId, userId } = req.body;
    const result = await roomService.leaveRoom(roomId, userId);
    res.json(result);
  }

  async getRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room = await roomService.getRoom(id as unknown as number);
      res.json(room);
    } catch {
      res.json('Room is not found')
    }
    
  }
};

export const roomController = new RoomController();
