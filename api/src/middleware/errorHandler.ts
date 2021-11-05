import { Request, Response, NextFunction } from 'express';
import ApiError, { ErrorType } from '../utils/Error';
import HttpHandlers from '../utils/http-handlers';

const { errHandler } = HttpHandlers;

export default async function errorWare(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === ErrorType.TimedOut) {
    return errHandler(res, err.status, err.message).set('Connection', 'close');
  }

  return errHandler(res, err.status, err.message);
}
