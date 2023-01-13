import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { IPosts, IPostsResponse } from '../../interfaces/posts/postsInterface';

const newPostService = async (postData: IPosts): Promise<IPostsResponse> => {
    const postRepository = AppDataSource.getRepository(Post);
    const newPost = postRepository.create(postData);

    await postRepository.save(newPost);
    return newPost;
};

export { newPostService };
