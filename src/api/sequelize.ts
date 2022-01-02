import { Sequelize, ModelOptions } from "sequelize";
import config from "../config";

export const commonModelOption: ModelOptions = {
  timestamps: true,
  schema: "rnw",
  underscored: true,
};
export const sequelize = new Sequelize(config.db.dbURL, {
  host: config.db.host,
  dialect: "postgres",
  dialectOptions: config.db.ssl
    ? {
        ssl: {
          require: config.db.ssl,
          rejectUnauthorized: false,
        },
      }
    : {},
  ssl: config.db.ssl,
  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle,
  },
});
