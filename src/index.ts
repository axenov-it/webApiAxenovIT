import * as express from "express";
import * as dotenv from "dotenv";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as cors from "cors";

import { swaggerConfig } from "./config";
import { setRoutes, mongoose } from "lib";

(async function () {
  dotenv.config();
  await mongoose();

  const app = express();
  const port = process.env.APP_PORT;

  const router = await setRoutes(express.Router());

  app.use(bodyParser.json());

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerConfig))
  );

  app.use(cors());

  app.use(router);

  app.listen(port, () => {
    console.log(`API SERVER LISTENING AT ${process.env.APP_HOST}:${port}`);
  });
})();
