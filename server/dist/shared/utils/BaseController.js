"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const logger_1 = require("./logger");
class BaseController {
    handleSuccess(res, data, message = 'Resource processed successfully', status = 200) {
        res.status(status).json({
            success: true,
            data,
            message,
        });
    }
    handleError(error, res, contextMethod) {
        logger_1.logger.error(`Error in ${this.constructor.name}.${contextMethod}: ${error.message}`, { error });
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
exports.BaseController = BaseController;
