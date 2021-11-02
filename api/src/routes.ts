import { AllObjects, ParamObject } from './handlers/objects';
import { objectCacheWare } from './middleware/objCache';

import { requestLoggerWare } from './middleware/requestLogger';
import { Route } from './Models';

export const routes: Route[] = [
  // All Objects
  {
    method: 'get',
    path: '/objects',
    middlewares: [],
    handler: AllObjects,
  },
  {
    method: 'get',
    path: '/objects/:id',
    middlewares: [requestLoggerWare, objectCacheWare],
    handler: ParamObject,
  },
];
