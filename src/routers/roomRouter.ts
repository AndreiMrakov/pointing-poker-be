import { roomController } from '../controllers/roomController';
import Router from 'express';

export const roomRouter = Router();

roomRouter.post('/create', roomController.createRoom);
roomRouter.get('/:id', roomController.getRoom);
