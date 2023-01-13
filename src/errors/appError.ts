import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

export const errorIdentify = async (
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return resp.status(error.status).json({ message: error.message });
  }

  if (error.message.includes("invalid input syntax for type uuid")) {
    return resp.status(404).json({ message: error.message });
  }

  console.log(error.message);

  return resp.status(500).json({ message: "Erro interno no servidor" });
};
