import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";
import { Post } from "../../entities/post.entity";
import { AppDataSource } from "../../data-source";

const ensureInvalidPostIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const postRepository = AppDataSource.getRepository(Post)
    const post = await postRepository.findOneBy({id: req.params.id})
    if(!post){
        throw new AppError("Invalid id", 404)
    }

    return next()
}

export default ensureInvalidPostIdMiddleware