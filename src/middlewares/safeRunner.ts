import { NextFunction, Request, Response } from 'express';
import { Handler } from 'express-serve-static-core';

export function SafeRunner(middleware: Handler) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await middleware(request, response, next);
        }
        catch (error) {
            next(error);
        }
    }
}