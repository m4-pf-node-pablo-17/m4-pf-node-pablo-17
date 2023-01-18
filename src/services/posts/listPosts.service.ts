import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { IPosts } from '../../interfaces/posts/postsInterface';

const listPostsService = async (): Promise<IPosts[]> => {
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find();

    return posts;
};

export { listPostsService };
