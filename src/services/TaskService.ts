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
      await Task.create({
        title,
        description,
        roomId,
        is_active,
      });

      return await this.getAllTasks(roomId);
    } catch(e) {
      console.log(`Error create Task title=${title}: `, e);
    }
  }

  async setScoreTask(id: number, score: number, roomId: string) {
    try {
      await Task.update(
        { score },
        {
          where: { id },
        }
      );
      
      return await this.getAllTasks(roomId);
    } catch(e) {
      console.log(`Error update Task id=${id}: `, e);
    }
  }

  async setActiveTask(id: number, is_active: boolean, roomId: string) {
    try {
      await Task.update(
        { is_active: false },
        {
          where: {
            is_active: true,
            roomId: roomId,
          },
        }
      );
      await Task.update(
        { is_active },
        {
          where: { id },
        }
      );

      return await this.getAllTasks(roomId);
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
