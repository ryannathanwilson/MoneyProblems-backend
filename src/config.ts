require("dotenv").config();

export interface Config {
  app: {
    port: number;
  };
  auth: {
    accessSecret: string;
    refreshSecret: string;
    expiration: string;
    algorithms: string[];
    saltRounds: number;
  };
  db: {
    database: string;
    host: string;
    password: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
    port: number;
    user: string;
  };
}

const config: Config = {
  app: {
    port: parseInt(process.env.APP_PORT, 10),
  },
  auth: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiration: process.env.JWT_EXPIRATION,
    algorithms: ["HS256"],
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  },
  db: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
  },
};

export default config;
