import { Response } from 'express';
import { logger } from './logger';

export class BaseController {
  protected handleSuccess(res: Response, data: any, message = 'Resource processed successfully', status = 200) {
    res.status(status).json({
      success: true,
      data,
      message,
    });
  }

  protected handleError(error: any, res: Response, contextMethod: string) {
    logger.error(`Error in ${this.constructor.name}.${contextMethod}: ${error.message}`, { error });
    
    const status = error.statusCode || 500;
    const errorCode = error.errorCode || 'INTERNAL_SERVER_ERROR';
    const message = error.message || 'An unexpected error occurred';
    
    res.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message,
        details: error.details || null,
      },
    });
  }
}
