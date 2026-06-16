import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';
import { config } from '../../config/unifiedConfig';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected internal server error occurred';
  let details = null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    errorCode = 'VALIDATION_FAILED';
    message = err.message;
    details = Object.keys(err.errors).map((key) => ({
      field: key,
      issue: err.errors[key].message,
    }));
  } else if (err.name === 'ZodError') {
    // Zod validation error
    statusCode = 422;
    errorCode = 'VALIDATION_FAILED';
    message = 'Validation failed';
    details = err.errors.map((e: any) => ({
      field: e.path.join('.'),
      issue: e.message,
    }));
  } else {
    // Log unexpected errors
    logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, path: req.path });
  }

  // Format error standard response wrapper
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
      ...(config.env === 'development' && !(err instanceof ApiError) && { stack: err.stack }),
    },
  });
};
