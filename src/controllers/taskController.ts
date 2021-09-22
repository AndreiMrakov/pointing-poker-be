import { ServerEvent } from '../utils/enums/ServerEvent';
import { Request, Response } from 'express';
import { taskService } from '../services';

export async function createTask(data: any) {
  const { title, description, roomId } = data;
  // @ts-ignore
  const socket = this;
  const task = await taskService.createTask(title, description, roomId);
  socket.emit(ServerEvent.TaskCreated, {task});
}

export async function setScoreTask(data: any) {
  const { id, score, roomId } = data;
  // @ts-ignore
  const socket = this;
  const task = await taskService.setScoreTask(Number(id), score, roomId);
  socket.emit(ServerEvent.TaskUpdatedScore, {task});
}

export async function setActiveTask(data: any) {
  const { id, is_active, roomId } = data;
  // @ts-ignore
  const socket = this;
  const tasks = await taskService.setActiveTask(Number(id), is_active, roomId);
  socket.emit(ServerEvent.TaskUpdatedActive, {tasks});
}

export async function deleteTask(data: any) {
  const { id } = data;
  // @ts-ignore
  const socket = this;
  await taskService.deleteTask(Number(id)) && socket.emit(ServerEvent.TaskDeleted);
}


export class TaskController {  
  async getAllTasks(req: Request, res: Response) {
    const { roomId } = req.params;

    const tasks = await taskService.getAllTasks(roomId);

    res.json(tasks);
  }
}
