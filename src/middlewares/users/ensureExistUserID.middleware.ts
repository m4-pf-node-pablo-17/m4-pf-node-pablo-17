import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const ensureExistUserIDMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const ensureExistId = await userRepository.findOneBy({ id: req.params.id });

  if (!ensureExistId) {
    throw new AppError('User not exist', 401);
  }

  next();
};

export { ensureExistUserIDMiddleware };
