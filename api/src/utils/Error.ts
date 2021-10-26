import getLogger from './logger';

const { err } = getLogger;

export default class ApiError extends Error {
  constructor(public status: number, public message: string,) {
    super(message);
  }

  static NotFound(message = 'The Object not Found',) {
    err(message);
    return new ApiError(401, message);
  }

  static BadRequest(message = 'Bad Request',) {
    err(message);
    return new ApiError(400, message);
  }

  static Server(message = 'Server Error',) {
    err(message);
    return new ApiError(500, message);
  }
}