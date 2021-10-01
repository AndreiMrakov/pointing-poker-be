import { sequelize } from "@/db";
import { DataTypes, UUIDV4 } from "sequelize";

export const Room = sequelize.define('room', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
});
