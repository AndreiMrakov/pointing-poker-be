import { roomController } from '../controllers/roomController';
import Router from 'express';

export const roomRouter = Router();

roomRouter.post('/', roomController.createRoom);
roomRouter.get('/:id', roomController.getRoomById);
