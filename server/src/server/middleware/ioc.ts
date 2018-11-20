import { Response, NextFunction } from "express";
import { Request } from "../index";
import IOCContainer from "../../ioc/container";

const iocMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.ioc = new IOCContainer();
  next();
};

export default iocMiddleware;