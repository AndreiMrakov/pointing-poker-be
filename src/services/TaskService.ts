import { Task } from "@/models/Task";

class TaskService {
  async getAllTasks(roomId: string) {
    const tasks = await Task.findAll({
      where: { roomId }
    });

    return tasks;
  }

  async createTask(title: string, description: string, roomId: string) {
    try {
      const count = await Task.count({
        where: { roomId }
      });

      const is_active = count === 0 ? true : false;

      const task = await Task.create({
        title,
        description,
        roomId,
        is_active,
      });

      return task;
    } catch(e) {
      return `Task was not created. ${e}.`;
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
      return `Task id=${id} was not updated. ${e}.`;
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
      return `Task id=${id} was not updated. ${e}.`;
    }
  }

  async deleteTask(id: number) {
    try {
      await Task.destroy({
        where: { id },
      });

      return true;
    } catch(e) {
      return `Task id=${id} was not destroyed. ${e}.`;
    }
  }
}

export const taskService = new TaskService();
