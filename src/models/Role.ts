import { sequelize } from "../db/db";
import { DataTypes } from "sequelize";

export const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
}, {
  underscored: true,
});
