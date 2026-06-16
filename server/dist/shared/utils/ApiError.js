"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    errorCode;
    details;
    constructor(statusCode, errorCode, message, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, errorCode = 'BAD_REQUEST', details = null) {
        return new ApiError(400, errorCode, message, details);
    }
    static unauthorized(message = 'Authentication credentials are missing or invalid') {
        return new ApiError(401, 'UNAUTHORIZED', message);
    }
    static forbidden(message = 'You do not have permission to perform this action') {
        return new ApiError(403, 'FORBIDDEN', message);
    }
    static notFound(message = 'The requested resource was not found') {
        return new ApiError(404, 'NOT_FOUND', message);
    }
    static conflict(message, details = null) {
        return new ApiError(409, 'CONFLICT', message, details);
    }
    static validationFailed(message = 'Validation failed', details = null) {
        return new ApiError(422, 'VALIDATION_FAILED', message, details);
    }
    static internal(message = 'An unexpected internal server error occurred') {
        return new ApiError(500, 'INTERNAL_SERVER_ERROR', message);
    }
}
exports.ApiError = ApiError;
