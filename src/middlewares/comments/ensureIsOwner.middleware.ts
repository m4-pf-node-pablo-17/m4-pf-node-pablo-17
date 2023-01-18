import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { AppError } from '../../errors/appError';

const ensureIsOwnerMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const commentRepository = AppDataSource.getRepository(Comment);

    const findComment = await commentRepository.findOne({
        where: { id: req.params.id },
        relations: { user: true },
    });

    if (!findComment) {
        throw new AppError('Comment not found', 404);
    }

    if (findComment?.user.id !== req.user.id) {
        throw new AppError('You are not allowed', 401);
    }

    return next();
};

export default ensureIsOwnerMiddleware;
