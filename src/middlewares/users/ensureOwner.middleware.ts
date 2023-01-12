import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";

const ensureOwnerIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, isStore } = req.user;

  if (id !== req.params.id && !isStore) {
    throw new AppError("Not Authorization", 401);
  }

  return next();
};

export default ensureOwnerIsAdmMiddleware;
