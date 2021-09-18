import { RoomState } from "../models/RoomState";

const states = ['beginning', 'progress', 'finished'];

export const RoomStateSeed = async () => {
  Promise.all(
    states.map((state) => RoomState.findOrCreate({
      where: { title: state },
      defaults: {
          title: state,
        },
    }))
  );
};
