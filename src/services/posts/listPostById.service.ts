import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { AppError } from '../../errors/appError';
import { IPostsResponse } from '../../interfaces/posts/postsInterface';

const listPostByIdService = async (
    id: string
): Promise<IPostsResponse | null> => {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOneBy({ id: id });
    if (!post) {
        throw new AppError('Post not found', 404);
    }
    return post;
};

export { listPostByIdService };
