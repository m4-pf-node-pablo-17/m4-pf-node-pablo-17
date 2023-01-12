import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const ensureExistsUserMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const ensureBodyUser = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const userRepository = AppDataSource.getRepository(User);
    const ensureUserExist = await userRepository.findOneBy({
      email: ensureBodyUser.email,
    });

    if (ensureUserExist) {
      throw new AppError("Existing user", 409);
    }

    next();
  };

export { ensureExistsUserMiddleware };
