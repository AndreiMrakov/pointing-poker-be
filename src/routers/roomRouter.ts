import { roomController } from '@src/controllers/roomController';
import { roomService } from '@src/services/RoomService';
import Router from 'express';

export const roomRouter = Router();

roomRouter.post('/create', roomController.createRoom);
