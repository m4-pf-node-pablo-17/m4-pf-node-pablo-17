import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Product } from '../../entities/products.entities';
import { AppError } from '../../errors/appError';

const ensureExistProductIDMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productRepository = AppDataSource.getRepository(Product);

    const ensureExistId = await productRepository.findOneBy({
        id: req.params.id,
    });

    if (!ensureExistId) {
        throw new AppError('Product does not exist', 400);
    }

    next();
};

export { ensureExistProductIDMiddleware };
