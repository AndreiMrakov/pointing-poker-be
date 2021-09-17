import { RoomState } from "../models/RoomState";

export const RoomStateSeed = async () => {
  await RoomState.findOrCreate({
    where: { id: 1 },
    defaults: {
        title: 'beginning',
      },
  });
  await RoomState.findOrCreate({
    where: { id: 2 },
    defaults: {
        title: 'progress',
      },
  });
  await RoomState.findOrCreate({
    where: { id: 3 },
    defaults: {
        title: 'finished',
      }
  });
};
