import express, { Router } from "express";
import bodyParser from "body-parser";
import ioc from "./middleware/ioc";
import useRoutes from "./routes";

export default () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(ioc);

  useRoutes(app);

  return app;
};