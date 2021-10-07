export interface IUserRoomRole {
  id: number;
  userId: number;
  roomId: string;
  roleId: number;
  is_online: boolean;
  user: { 
    name: string;
    id: number;
  };  
  role: { 
    title: string;
    id: number;
  };
}