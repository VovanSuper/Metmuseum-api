import { Response } from "express";

export default {
  okHandler: (resp: Response, json: object | string) => resp.status(200).json(json)
};