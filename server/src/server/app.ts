import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ioc from "./middleware/ioc";
import boom from "./middleware/boom";
import useRoutes from "./routes";

export default () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(ioc);
  app.use(boom);
  useRoutes(app);

  return app;
};