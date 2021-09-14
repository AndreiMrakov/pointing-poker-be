import { Role } from "./Role";
import { Room } from "./Room";
import { User } from "./User";

Role.hasMany(User);
User.belongsTo(Role); 

Room.hasMany(User);
User.belongsTo(Room);