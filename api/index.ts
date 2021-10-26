import { AddressInfo } from 'net';
import express, { urlencoded, json } from 'express';
import cors from "cors";
import { routes } from './src/routes';

(() => {
  const app = express();
  const PORT = process.env.PORT ?? 8088;

  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());

  routes.forEach(routeDef => {
    const { method, path, middlewares, handler } = routeDef;
    app[method](path, ...middlewares, handler);
  });

  const server = app.listen(PORT, () => {
    console.log(`Listening @ ${(<AddressInfo>(server.address())).port}`);
  });

})();
