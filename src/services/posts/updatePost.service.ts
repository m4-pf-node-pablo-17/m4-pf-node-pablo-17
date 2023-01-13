import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { AppError } from '../../errors/appError';
import {
    IPostsResponse,
    IPostsUpdate,
} from '../../interfaces/posts/postsInterface';

const updatePostService = async (
    postData: IPostsUpdate,
    postId: string
): Promise<IPostsResponse> => {
    const postRepository = AppDataSource.getRepository(Post);
    const foundPost = await postRepository.findOneBy({ id: postId });

    if (!foundPost) {
        throw new AppError('Post not found!', 404);
    }

    const updatedPost = postRepository.create({
        ...foundPost,
        ...postData,
    });
    await postRepository.save(updatedPost);

    return updatedPost;
};

export { updatePostService };
