import { Objects } from './handlers/objects';

import { requestLoggerWare } from './middleware/requestLogger';
import { Route } from './types';

export const routes: Route[] = [
  // All Objects
  {
    method: 'get',
    path: '/objects',
    middlewares: [],
    handler: Objects,
  },
  {
    method: 'get',
    path: '/objects/:id',
    middlewares: [requestLoggerWare],
    handler: Objects,
  },

];
