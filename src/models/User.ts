import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  surname: {type: DataTypes.STRING, allowNull: true},
  job: {type: DataTypes.STRING, allowNull: true},
  avatar: {type: DataTypes.STRING, allowNull: true},
  score: {type: DataTypes.STRING, allowNull: true},
  isAccess: {type: DataTypes.BOOLEAN, defaultValue: false},
});
