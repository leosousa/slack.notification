"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
const appError_1 = require("../errors/appError");
function ResponseError(error, request, response, next) {
    console.error(error);
    if (error instanceof appError_1.AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}
exports.ResponseError = ResponseError;
