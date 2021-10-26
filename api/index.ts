import { AddressInfo } from 'net';
import express, { urlencoded, json } from 'express';
import { routes } from './src/routes';

const app = express();
const PORT = process.env.PORT ?? 8088;

app.use(json());
app.use(urlencoded({ extended: false }));

routes.forEach((route) => {
  const { method, path, middlewares: middleware, handler } = route;
  app[method](path, ...middleware, handler);
});

const server = app.listen(PORT, () => {
  console.log(`Listening @ ${(<AddressInfo>(server.address())).address}`);
});
