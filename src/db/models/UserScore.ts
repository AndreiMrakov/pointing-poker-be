import { sequelize } from "../db";
import { DataTypes, QueryInterface, UniqueConstraintError } from "sequelize";

export const UserScore = sequelize.define('user_score', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  score: DataTypes.INTEGER,
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'taskId']
    }
  ]
});
