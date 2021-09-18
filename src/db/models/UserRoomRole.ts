import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const UserRoomRole = sequelize.define('user_room_role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: [
        'room_id',
        'user_id',
      ],
    }
  ]
});
