import { Dialect, Sequelize } from 'sequelize';

export const sequlize =  new Sequelize(
  "pointing_poker",
  "postgres",
  "root",
  {
    dialect: "postgres" as Dialect,
    host: "localhost",
    port: 5432,
  }
);
