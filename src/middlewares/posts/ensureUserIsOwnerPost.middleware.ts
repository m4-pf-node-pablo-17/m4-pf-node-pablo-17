import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { AppError } from '../../errors/appError';

const ensureUserIsOwnerOfPostMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const postRepository = AppDataSource.getRepository(Post);

    const ensurePostId = await postRepository.findOneBy({ id: req.params.userId });

    const userId = req.body.userId;

    if (ensurePostId?.user.id !== userId) {
        throw new AppError('You are not allowed to do this', 401);
    }

    next();
};

export { ensureUserIsOwnerOfPostMiddleware };
