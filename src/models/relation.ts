import { Message } from "./Message";
import { Role } from "./Role";
import { Room } from "./Room";
import { RoomState } from "./RoomState";
import { Task } from "./Task";
import { User } from "./User";
import { UserRoomRole } from "./UserRoomRole";
import { UserScore } from "./UserScore";

Task.hasMany(UserScore, {foreignKey: { allowNull: false }});
UserScore.belongsTo(Task);

User.hasMany(UserScore, {foreignKey: { allowNull: false }});
UserScore.belongsTo(User);

User.hasMany(Message, {foreignKey: { allowNull: false }});
Message.belongsTo(User);

RoomState.hasMany(Room, {foreignKey: { defaultValue: 3, allowNull: false } });
Room.belongsTo(RoomState);

Room.hasMany(Task, {foreignKey: { allowNull: false }});
Task.belongsTo(Room);

Room.hasMany(Message, {foreignKey: { allowNull: false }});
Message.belongsTo(Room);

User.hasMany(UserRoomRole, {foreignKey: { allowNull: false }});
UserRoomRole.belongsTo(User);

Room.hasMany(UserRoomRole, {foreignKey: { allowNull: false }});
UserRoomRole.belongsTo(Room);

Role.hasMany(UserRoomRole);
UserRoomRole.belongsTo(Role);
