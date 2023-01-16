import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { IPosts, IPostsResponse } from '../../interfaces/posts/postsInterface';

const newPostService = async (postData: IPosts, userId: string): Promise<IPostsResponse> => {
    console.log("Oi", userId)
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOneBy({
        id: userId,
    });

    const newPost = postRepository.create({
        ...postData,
        user: user!
    });

    await postRepository.save(newPost);
    return newPost;
};

export { newPostService };
