export interface ITask {
  id: number,
  title: string,
  roomId: string,
  description?: string,
  is_active?: boolean,
  score?: string,
  avg_score?: number,
  createdAt: Date,
}
