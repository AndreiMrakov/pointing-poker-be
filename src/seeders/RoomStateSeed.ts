import { RoomState } from "@/models";

const states = ['beginning', 'progress', 'finished'];

export const roomStateSeed = async () => {
  Promise.all(
    states.map((state) => RoomState.findOrCreate({
      where: { title: state },
      defaults: {
          title: state,
        },
    }))
  );
};
