import { AppError } from '../errors/appError';
import { NextFunction, Request, Response } from 'express';

export function ResponseError(error: Error, request: Request, response: Response, next: NextFunction) {
    console.error(error);

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}