import { BadRequestError } from "@/error";
import { getAvgScore, getScore } from "@/helper";
import { Task, UserScore } from "@/models";
import { ITask } from "@/utils/interfaces";

class TaskService {
  async getAllTasks(roomId: string) {
    const tasks = await Task.findAll({
      where: { roomId },
      attributes: {
        exclude: ['updatedAt']
      },
    });

    return tasks;
  }

  async createTask({ title, description, roomId }: ITask) {
    try {
      const count = await Task.count({
        where: { roomId }
      });

      const is_active = !count;

      const task = await Task.create({
        title,
        description,
        roomId,
        is_active,
      });

      return task;
    } catch(e) {
      return new BadRequestError(`Error in create Task. ${e}`);
    }
  }

  async setScoreTask({ id, score }: ITask) {
    try {
      const [_, tasks] = await Task.update(
        { score },
        {
          where: { id },
          returning: true,
        }
      );

      return tasks[0];
    } catch(e) {
      return new BadRequestError(`Error in updated Task id=${id}. ${e}`);
    }
  }

  async setActiveTask({ id }: ITask) {
    try {
      await Task.update(
        { is_active: false },
        {
          where: { is_active: true },
        }
      );

      const [_, activeTasks] = await Task.update(
        { is_active: true },
        {
          where: { id },
          returning: true,
        }
      );

      return activeTasks[0];
    } catch(e) {
      return new BadRequestError(`Error in updated Task id=${id}. ${e}`);
    }
  }

  async deleteTaskById({ id }: ITask) {
    try {
      await Task.destroy({
        where: { id },
      });

      return id;
    } catch(e) {
      return new BadRequestError(`Error destroyed Task id=${id}. ${e}`);
    }
  }

  async resetScoreIssue(id: number) {
    try {
      await UserScore.update(
        {score: null},
        {
          where: {
            taskId: id,
          },
        },
      );
    } catch (err) {
      return new BadRequestError(`Dont reset score. ${err}.`);
    }
  }

  async avgScore(id: number) {
    try {
      const scores = await UserScore.findAll(
        {
          where: {
            taskId: id,
          },
          attributes: ['score'],
        },
      );
      
      const avgScore = getAvgScore(scores.map(score => (score.get('score') as string)));
      const score = getScore(avgScore);
      await Task.update(
        {
          avg_score: avgScore,
          score: score,
        },
        {
          where: {
            id,
          },
        },
      );
      return score;
    } catch (err) {
      return new BadRequestError(`Dont update avg score. ${err}.`);
    }
  }
}

export const taskService = new TaskService();
