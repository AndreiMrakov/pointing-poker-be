import { Role } from "../models/Role";

const roles = ['admin', 'user', 'spectator'];

export const RoleSeed = async () => {
  Promise.all(
    roles.map((role) => Role.findOrCreate({
      where: { title: role },
      defaults: {
          title: role,
        },
    }))
  );
};
