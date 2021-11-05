import { Response } from 'express';

export default {
  okHandler: (resp: Response, json: object | string) => resp.status(200).json(json),
  errHandler: (resp: Response, status: number, message: string) => resp.status(status).json({ error: { message } }),
};
