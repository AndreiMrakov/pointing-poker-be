export interface IUser {
  id: number;
  name: string;
  role?: string;
  isOnline: boolean;
  score: string | null;
}
