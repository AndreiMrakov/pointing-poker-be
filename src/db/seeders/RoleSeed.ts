import { Role } from "../models/Role";

export const RoleSeed = async () => {
  await Role.findOrCreate({
    where: { id: 1 },
    defaults: {
        title: 'admin',
      },
  });
  await Role.findOrCreate({
    where: { id: 2 },
    defaults: {
        title: 'user',
      },
  });
  await Role.findOrCreate({
    where: { id: 3 },
    defaults: {
        title: 'guest',
      }
  });
};
