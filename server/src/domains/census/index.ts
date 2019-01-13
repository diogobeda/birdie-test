import { Router } from "express";
import Boom from "boom";
import { ICensusDomain } from "./Census";
import { Request, Response } from "../../server";
import IOCContainer from "../../ioc/container";

export const Key = Symbol.for("CensusDomain");
export {
  ICensusDomain,
  CensusDomain
} from "./Census";

const censusDomain = (ioc: IOCContainer): ICensusDomain => ioc.get<ICensusDomain>(Key);
export const createRouter = (): Router => {
  const router = Router();

  router.get("/columns", async ({ ioc }: Request, res: Response) => {
    try {
      const columns = await censusDomain(ioc).getCensusColumns();
      res.json({ columns });
    } catch (e) {
      res.boomError(e);
    }
  });

  router.get("/column_data", async ({ query, ioc }: Request, res: Response) => {
    const { column } = query;
    // @FIXME: Add error handling
    const data = await censusDomain(ioc).getCensusDataByColumn(column);
    res.json({ data });
  });

  return router;
};