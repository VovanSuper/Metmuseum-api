import { Request, RequestHandler as Middleware, Response, Send } from 'express';

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';
export type Handler = (req: Request, res: Response) => Send | unknown;
export type Route = {
  method: Method;
  path: string;
  middlewares: Middleware[];
  handler: Handler;
};
