import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/appError';

const ensureIsActiveMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bodyRequest = Object.keys(req.body);

    if (bodyRequest.includes('isActive')) {
        throw new AppError('Not authorization', 401);
    }
    if (bodyRequest.includes('id')) {
        throw new AppError('Not authorization', 401);
    }

    return next();
};

export default ensureIsActiveMiddleware;
