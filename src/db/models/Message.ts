import { sequelize } from "@/db";
import { DataTypes } from "sequelize";

export const Message = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  underscored: true,
});
