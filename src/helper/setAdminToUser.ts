import { userService } from "@/services";

export const setAdminToUser = async (userId: number, roomId: string) => {
  const isAdmin = await userService.isAdmin(userId, roomId);
 
  if ( isAdmin ) {
    return await userService.setAdminToUser(userId, roomId);
  } else {
    return false;
  }
}
