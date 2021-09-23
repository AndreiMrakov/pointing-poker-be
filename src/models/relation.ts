import { Message } from "./Message";
import { Role } from "./Role";
import { Room } from "./Room";
import { RoomState } from "./RoomState";
import { Task } from "./Task";
import { User } from "./User";
import { UserRoomRole } from "./UserRoomRole";
import { UserScore } from "./UserScore";

Task.hasMany(UserScore);
UserScore.belongsTo(Task);

User.hasMany(UserScore);
UserScore.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User);

RoomState.hasMany(Room);
Room.belongsTo(RoomState);

Room.hasMany(Task);
Task.belongsTo(Room);

Room.hasMany(Message);
Message.belongsTo(Room);

User.hasMany(UserRoomRole);
UserRoomRole.belongsTo(User);

Room.hasMany(UserRoomRole);
UserRoomRole.belongsTo(Room);

Role.hasMany(UserRoomRole);
UserRoomRole.belongsTo(Role);
