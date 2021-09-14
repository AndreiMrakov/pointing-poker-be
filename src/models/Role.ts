import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const Role = sequelize.define('role', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
});
