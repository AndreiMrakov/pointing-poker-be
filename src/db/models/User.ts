import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  surname: DataTypes.STRING,
  job: DataTypes.STRING,
  avatar: DataTypes.STRING,
  score: DataTypes.STRING,
  is_access: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {
  underscored: true,
});
