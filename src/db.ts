import { Dialect, Sequelize } from 'sequelize';

export const sequlize =  new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  String(process.env.DB_PASSWORD),
  {
    dialect: (process.env.DB_CONNECT || "postgres") as Dialect,
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
  }
);
