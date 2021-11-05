import { Server, AddressInfo } from 'net';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { routes } from './src/routes';
import { defaultConfig } from './src/utils/helpers';
import errorWare from './src/middleware/errorHandler';

let server: Server;

(() => {
  const app = express();
  const PORT = process.env.PORT || defaultConfig.PORT || 8088;

  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());

  routes.forEach(routeDef => {
    const { method, path, middlewares, handler } = routeDef;
    app[method](path, ...middlewares, handler);
  });

  app.use(errorWare);

  server = app.listen(PORT, () => {
    console.log(`Listening @ ${(<AddressInfo>server.address()).port}`);
  });
})();

function shutdownHandler() {
  try {
    if (server)
      setTimeout(() => {
        server.close(err => {
          if (err) {
            return console.error(err);
          }
          console.log('Shutting down... ');
          process.exit();
        });
      }, 0);
  } catch (e) {
    if (e instanceof Error) console.error(`Error shutting down :: ${e.message || e}`);
  }
}

process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);
