import { Sequelize, ModelOptions } from "sequelize";
import config from "../config";

export const commonModelOption: ModelOptions = {
  timestamps: true,
  schema: "rnw",
  underscored: true,
};
export const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "postgres",
    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);
