import { sequelize } from "@/db";
import { DataTypes } from "sequelize";

export const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  score: DataTypes.INTEGER,
  avg_score: DataTypes.FLOAT,
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  underscored: true,
});
