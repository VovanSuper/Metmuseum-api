import { RequestHandler as Middleware, Request, Response, NextFunction } from 'express';
import cacheSvc from '../services/redis.svc';
import logger from '../utils/logger';

export const objectCacheWare: Middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log('Trying to get from cache....');
    const object = await cacheSvc.find(id);
    if (object) {
      logger.l(`Object for key ${id} found in cache`);
      return res.status(200).json({ object });
    }
  } catch (e) {
    console.error(e);
  }
  return next();
};
