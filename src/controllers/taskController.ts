import { ServerEvent } from '../utils/enums/ServerEvent';
import { Request, Response } from 'express';
import { taskService } from '../services';

export async function createTask(data: any) {
  const { title, description, roomId } = data;
  // @ts-ignore
  const socket = this;
  const task = await taskService.createTask(title, description, roomId);
  socket.to(roomId).emit(ServerEvent.TaskCreated, {task});
}

export async function setScoreTask(data: any) {
  const { id, score, roomId } = data;
  // @ts-ignore
  const socket = this;
  const task = await taskService.setScoreTask(Number(id), score, roomId);
  socket.to(roomId).emit(ServerEvent.TaskUpdatedScore, {task});
}

export async function setActiveTask(data: any) {
  const { id, is_active, roomId } = data;
  // @ts-ignore
  const socket = this;
  const tasks = await taskService.setActiveTask(Number(id), is_active, roomId);
  socket.to(roomId).emit(ServerEvent.TaskUpdatedActive, {tasks});
}

export async function deleteTask(data: any) {
  const { id } = data;
  // @ts-ignore
  const socket = this;
  await taskService.deleteTask(Number(id)) && socket.emit(ServerEvent.TaskDeleted);
}

export async function getAllTasks(req: Request, res: Response) {
  const { room_id } = req.query;
  const tasks = await taskService.getAllTasks(String(room_id));
  res.json(tasks);
}
