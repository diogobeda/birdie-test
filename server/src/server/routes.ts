import { Express } from "express";
import { createRouter as createCensusRouter } from "../domains/census";

export default (app: Express): void => {
  const censusRouter = createCensusRouter();

  app.use("/census", censusRouter);
};