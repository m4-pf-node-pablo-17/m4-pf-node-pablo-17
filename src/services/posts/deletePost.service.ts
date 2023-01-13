import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { AppError } from '../../errors/appError';

const deletePostService = async (id: string) => {
    const postRepository = AppDataSource.getRepository(Post);

    const postToDelete = await postRepository.findOneBy({ id });

    if (!postToDelete) {
        throw new AppError('Post not found.', 404);
    }

    await postRepository
        .createQueryBuilder('posts')
        .delete()
        .from(Post)
        .where('id = :id', { id })
        .execute();

    return {};
};

export { deletePostService };
