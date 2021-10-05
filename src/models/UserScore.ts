import { sequelize } from "@/db";
import { DataTypes } from "sequelize";

export const UserScore = sequelize.define('user_score', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  score: DataTypes.STRING,
}, {
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: [
        'user_id',
        'task_id',
      ],
    }
  ]
});
