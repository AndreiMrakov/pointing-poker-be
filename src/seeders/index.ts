import { roomStateSeed } from './RoomStateSeed';
import { roleSeed } from './RoleSeed';

export const runAllSeeds = async () => {
  await roomStateSeed();
  await roleSeed();
};
