import { Task } from "@/models";
import { ITask } from "@/utils/interfaces";

class TaskService {
  async getAllTasks(roomId: string) {
    const tasks = await Task.findAll({
      where: { roomId }
    });

    return tasks;
  }

  async createTask(payload: ITask) {
    const { title, description, roomId } = payload;

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
      console.log(`Task was not created. ${e}.`);
    }
  }

  async setScoreTask(payload: ITask) {
    const { id, score } = payload;

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
      console.log(`Task id=${id} was not updated. ${e}.`);
    }
  }

  async setActiveTask(payload: ITask) {
    const { id } = payload;

    try {
      const activeTask = await Task.update(
        { is_active: true },
        {
          where: { id },
          returning: true,
        }
      );

      return activeTask;
    } catch(e) {
      console.log(`Task id=${id} was not updated. ${e}.`);
    }
  }

  async deleteTask(payload: ITask) {
    const { id } = payload;

    try {
      await Task.destroy({
        where: { id },
      });

      return true;
    } catch(e) {
      console.log(`Task id=${id} was not destroyed. ${e}.`);
    }
  }
}

export const taskService = new TaskService();
