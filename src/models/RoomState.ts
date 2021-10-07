import { sequelize } from "@/db";
import { DataTypes } from "sequelize";

export const RoomState = sequelize.define('room_state', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
});
