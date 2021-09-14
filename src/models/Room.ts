import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const Room = sequelize.define('room', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  link: {type: DataTypes.STRING},
});
