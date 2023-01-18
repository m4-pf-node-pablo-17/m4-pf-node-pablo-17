import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { AppError } from '../../errors/appError';

const ensureInvalidPostIdMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOneBy({ id: req.params.id });
    if (!post) {
        throw new AppError('Invalid id', 404);
    }

    return next();
};

export default ensureInvalidPostIdMiddleware;
