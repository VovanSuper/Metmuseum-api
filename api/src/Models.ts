import { NextFunction, Request, RequestHandler as Middleware, Response, Send } from 'express';

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';
export type Handler = (req: Request, res: Response, next: NextFunction) => Send | unknown;
export type Route = {
  method: Method;
  path: string;
  middlewares: Middleware[];
  handler: Handler;
};

export interface IObjects {
  total: number;
  objectIDs: number[];
}

export interface IObjectInfoBase {
  objectID: number;
  objectName: string;
  title: string;
  isHighlight: boolean;
  accessionNumber: string;
  accessionYear: number;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
}
