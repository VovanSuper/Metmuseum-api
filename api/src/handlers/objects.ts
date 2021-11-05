import { Handler, IObjects } from '../Models';
import { defaultConfig } from '../utils/helpers';
import ObjectSvc from '../services/objects.svc';
import redisSvc from '../services/redis.svc';
import handlers from '../utils/http-handlers';

const { okHandler } = handlers;
const { REDIS_OBJECTS_IDS_KEY } = defaultConfig;

export const AllObjects: Handler = async (req, res, next) => {
  try {
    const objectsFromStore = await redisSvc.find<IObjects>(REDIS_OBJECTS_IDS_KEY);
    if (objectsFromStore) {
      return okHandler(res, { objects: objectsFromStore });
    }
    const objects = await ObjectSvc.getAllObjects();
    return okHandler(res, { objects });
  } catch (e) {
    return next(e);
  }
};

export const ParamObject: Handler = async (req, res, next) => {
  try {
    const { id: objectId } = req.params || {};
    const object = await ObjectSvc.getObject(objectId);

    return okHandler(res, { object });
  } catch (e) {
    return next(e);
  }
};
