import { HttpError } from "@/error";
import { roomService } from "@/services";

export const leaveUser = async (userId: number, roomId: string) => {
  const user = await roomService.leaveRoom({roomId, userId});
  if (user instanceof HttpError) {
    return console.log(user);
  }
  return user;
}
