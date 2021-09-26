import { Role } from "@/models";

const roles = ['admin', 'user', 'spectator'];

export const roleSeed = async () => {
  Promise.all(
    roles.map((role) => Role.findOrCreate({
      where: { title: role },
      defaults: {
          title: role,
        },
    }))
  );
};
