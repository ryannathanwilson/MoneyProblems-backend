import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./api";
import { sequelize } from "./api/sequelize";

const port = process.env.PORT || 3001;
const app = express();

(async () => {
  await sequelize.authenticate();
  await sequelize.createSchema("rnw", { logging: false });
  // await sequelize.sync({ force: true });
  await sequelize.sync();

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://momoneymoproblems.netlify.app",
        "https://mo-money-dev.netlify.app",
      ],
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
