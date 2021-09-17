import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const UserRoomRole = sequelize.define('user_room_role', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {
  indexes: [
    {
      unique: true,
      fields: ['roomId', 'userId']
    }
  ]
});
