import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import api from "./api";
import sequelize from "./api/sequelize";

const { port } = config.app;
const app = express();
(async () => {
  await sequelize.authenticate();
  await sequelize.createSchema("rnw", { logging: false });
  await sequelize.sync({ force: true });

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://localhost:3001"],
    })
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(`/api`, api);
  app.get("/", (_, res) => {
    res.json("Mo Money Mo Problems API");
  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
})();
