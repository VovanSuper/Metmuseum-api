import { RequestHandler as Middleware, Request, Response, NextFunction } from 'express';
import logger from "../utils/logger";

export const requestLoggerWare: Middleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.params)
    logger.l(`Query params :: ${JSON.stringify(req.params, null, 2)}`);
  logger.l(`Requested: ${req.path}`);

  next();
};
