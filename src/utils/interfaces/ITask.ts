export interface ITask {
  id: number,
  title: string,
  roomId: string,
  description?: string,
  isActive?: boolean,
  score?: number,
  avgScore?: number,
  createdAt: Date,
}
