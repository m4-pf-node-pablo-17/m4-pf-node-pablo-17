import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/appError';

const ensureExistUserIDMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user.id;

    if (!user) {
        throw new AppError('User not found', 404);
    }

    next();
};

export { ensureExistUserIDMiddleware };
