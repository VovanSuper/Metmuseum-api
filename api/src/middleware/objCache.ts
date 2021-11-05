import { RequestHandler as Middleware, Request, Response, NextFunction } from 'express';
import { IObjectInfoBase } from '../Models';
import cacheSvc from '../services/redis.svc';
import logger from '../utils/logger';

export const objectCacheWare: Middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.l('PATH::::::::: ' + req.path);

    console.log('Trying to get from cache....');
    const object = await cacheSvc.find<IObjectInfoBase>(id);
    if (object) {
      logger.l(`Object for key ${id} found in cache`);
      return res.status(200).json({ object });
    }
  } catch (e) {
    if (e instanceof Error) logger.err(e.message);
  }

  return next();
};
