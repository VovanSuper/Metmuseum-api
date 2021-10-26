import { Handler } from '../types';
import handlers from '../utils/http-handlers';

const { okHandler } = handlers;

export const Objects: Handler = (req, res) => okHandler(res, 'All Objects');
export const Object: Handler = (req, res) => {

  okHandler(res, '');
};
