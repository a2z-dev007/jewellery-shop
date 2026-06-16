"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const logger_1 = require("../utils/logger");
const unifiedConfig_1 = require("../../config/unifiedConfig");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected internal server error occurred';
    let details = null;
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.statusCode;
        errorCode = err.errorCode;
        message = err.message;
        details = err.details;
    }
    else if (err.name === 'ValidationError') {
        // Mongoose validation error
        statusCode = 400;
        errorCode = 'VALIDATION_FAILED';
        message = err.message;
        details = Object.keys(err.errors).map((key) => ({
            field: key,
            issue: err.errors[key].message,
        }));
    }
    else if (err.name === 'ZodError') {
        // Zod validation error
        statusCode = 422;
        errorCode = 'VALIDATION_FAILED';
        message = 'Validation failed';
        details = err.errors.map((e) => ({
            field: e.path.join('.'),
            issue: e.message,
        }));
    }
    else {
        // Log unexpected errors
        logger_1.logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, path: req.path });
    }
    // Format error standard response wrapper
    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message,
            ...(details && { details }),
            ...(unifiedConfig_1.config.env === 'development' && !(err instanceof ApiError_1.ApiError) && { stack: err.stack }),
        },
    });
};
exports.errorHandler = errorHandler;
