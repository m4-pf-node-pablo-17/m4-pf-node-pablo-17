import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isStore = req.user.isStore;

  if (!isStore) {
    throw new AppError('User is not store', 403);
  }

  return next();
};

export default ensureIsAdmMiddleware;
