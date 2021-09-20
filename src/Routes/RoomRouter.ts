import { roomService } from '@src/Services/RoomService';
import Router from 'express';

export const roomRouter = Router();

roomRouter.post('/create', roomService.createRoom);
