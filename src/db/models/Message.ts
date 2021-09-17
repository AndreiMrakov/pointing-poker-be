import { sequelize } from "../db";
import { DataTypes, Sequelize } from "sequelize";

export const Message = sequelize.define('message', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.TEXT, allowNull: false},
  date: { type: DataTypes.DATE, defaultValue: new Date() },
}, {
  underscored: true,
});
