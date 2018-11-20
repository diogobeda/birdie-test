import { Router, Response } from "express";
import { ICensusDomain } from "./Census";
import { Request } from "../../server";
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
    const columns = await censusDomain(ioc).getCensusColumns();
    res.json({ columns });
  });

  router.get("/column_data", async ({ query, ioc }: Request, res: Response) => {
    const { column } = query;
    // @FIXME: Add error handling
    const data = await censusDomain(ioc).getCensusDataByColumn(column);
    res.json({ data });
  });

  return router;
};