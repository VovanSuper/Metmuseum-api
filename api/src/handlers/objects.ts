import { Handler } from '../types';
import ObjectSvc from "../services/objects.svc";
import handlers from '../utils/http-handlers';
const { okHandler } = handlers;

export const AllObjects: Handler = async (req, res) => {
  const objects = await ObjectSvc.getAllObjects();
  okHandler(res, { objects });
};

export const ParamObject: Handler = async (req, res) => {
  const { id: objectId } = req.params || {};
  const object = await ObjectSvc.getObject(objectId);

  okHandler(res, { object });
};
