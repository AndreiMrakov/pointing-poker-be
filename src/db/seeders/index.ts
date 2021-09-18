import { RoomStateSeed } from './RoomStateSeed';
import { RoleSeed } from './RoleSeed';

export const runAllSeeds = async () => {
  await RoomStateSeed();
  await RoleSeed();
};
