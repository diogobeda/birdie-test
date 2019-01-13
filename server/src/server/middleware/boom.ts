import Boom from "boom";
import { NextFunction } from "express";
import { Request, Response } from "../index";

const boomMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.boomError = (error: Boom) => {
    res.status(error.output.statusCode)
        .send(error.message);
  };

  next();
};

export default boomMiddleware;
