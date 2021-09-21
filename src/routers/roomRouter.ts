import { roomService } from '@src/services/RoomService';
import Router from 'express';

export const roomRouter = Router();

roomRouter.post('/create', roomService.createRoom);
