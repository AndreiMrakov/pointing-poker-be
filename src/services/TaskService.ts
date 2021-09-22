import { ServerEvent } from "../utils/enums/ServerEvent";
import { Task } from "../models/Task";

class TaskService {
  async getAllTasks(roomId: string) {
    const tasks = await Task.findAll({
      where: { roomId }
    });

    return tasks;
  }

  async createTask(title: string, description: string, roomId: string) {
    const count = await Task.count({
      where: { roomId }
    });

    const is_active = count === 0 ? true : false;

    try {
      const task = await Task.create({
        title,
        description,
        roomId,
        is_active,
      });

      return task;
    } catch(e) {
      console.log(`Error create Task title=${title}: `, e);
    }
  }

  async setScoreTask(id: number, score: number, roomId: string) {
    try {
      const task = await Task.update(
        { score },
        {
          where: { id },
          returning: true,
        }
      );

      return task;
    } catch(e) {
      console.log(`Error update Task id=${id}: `, e);
    }
  }

  async setActiveTask(id: number, is_active: boolean, roomId: string) {
    try {
      const unActiveTask = await Task.update(
        { is_active: false },
        {
          where: {
            is_active: true,
            roomId: roomId,
          },
          returning: true,
        }
      );
      const activeTask = await Task.update(
        { is_active },
        {
          where: { id },
          returning: true,
        }
      );

      return {unActiveTask, activeTask};
    } catch(e) {
      console.log(`Error update Task id=${id}: `, e);
    }
  }

  async deleteTask(id: number) {
    try {
      await Task.destroy({
        where: { id },
      });

      return true;
    } catch(e) {
      console.log(`Error destroy Task id=${id}: `, e);
    }
  }
}

export const taskService = new TaskService();
