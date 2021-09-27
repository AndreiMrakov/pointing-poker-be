import { sequelize } from "@/db";
import { DataTypes, UUIDV4 } from "sequelize";

export const Room = sequelize.define('room', {
  id: {
<<<<<<< HEAD:src/db/models/Room.ts
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
=======
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
>>>>>>> develop:src/models/Room.ts
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
});
