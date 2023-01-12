import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const ensureExistUserIDMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const ensureExistId = await userRepository.findOneBy({ id: req.params.id });

  if (!ensureExistId) {
    throw new AppError("User does not exist", 404);
  }

  next();
};

export { ensureExistUserIDMiddleware };
