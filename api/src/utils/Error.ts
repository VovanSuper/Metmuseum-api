import getLogger from './logger';

const { err } = getLogger;
export enum ErrorType {
  NotFound,
  BadRequest,
  TimedOut,
  Server,
}

export default class ApiError extends Error {
  type: ErrorType;

  constructor(public status: number, public message: string, errorType?: ErrorType) {
    super(message);
    this.type = errorType ?? ErrorType.Server;
  }

  static NotFound(message = 'The Object not Found') {
    err(message);
    return new ApiError(401, message, ErrorType.NotFound);
  }

  static BadRequest(message = 'Bad Request') {
    err(message);
    return new ApiError(400, message, ErrorType.BadRequest);
  }

  static RequestTimeout(message = 'Request Timed Out') {
    err(message);
    return new ApiError(408, message, ErrorType.TimedOut);
  }

  static Server(message = 'Server Error') {
    err(message);
    return new ApiError(500, message);
  }
}
