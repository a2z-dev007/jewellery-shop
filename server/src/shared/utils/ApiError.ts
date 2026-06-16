import { ErrorCode } from '../constants/errorCodes';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;
  public readonly details: any;

  constructor(statusCode: number, errorCode: ErrorCode, message: string, details: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errorCode: ErrorCode = 'BAD_REQUEST', details: any = null) {
    return new ApiError(400, errorCode, message, details);
  }

  static unauthorized(message: string = 'Authentication credentials are missing or invalid') {
    return new ApiError(401, 'UNAUTHORIZED', message);
  }

  static forbidden(message: string = 'You do not have permission to perform this action') {
    return new ApiError(403, 'FORBIDDEN', message);
  }

  static notFound(message: string = 'The requested resource was not found') {
    return new ApiError(404, 'NOT_FOUND', message);
  }

  static conflict(message: string, details: any = null) {
    return new ApiError(409, 'CONFLICT', message, details);
  }

  static validationFailed(message: string = 'Validation failed', details: any = null) {
    return new ApiError(422, 'VALIDATION_FAILED', message, details);
  }

  static internal(message: string = 'An unexpected internal server error occurred') {
    return new ApiError(500, 'INTERNAL_SERVER_ERROR', message);
  }
}
