import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IPosts, IPostsResponse } from '../../interfaces/posts/postsInterface';
import { respUserSchema } from '../../schemas/user/schemaUser';

const newPostService = async (
    postData: IPosts,
    userId: string
): Promise<IPostsResponse> => {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    // const post = await postRepository.findOneBy({
    //     id: postData.id,
    // });

    // if (postData.id == post.id) {
    //     throw new AppError('Cannot do that', 409);
    // }

    const user = await userRepository.findOneBy({
        id: userId,
    });

    const resUser = await respUserSchema.validate(user, {
        stripUnknown: true,
    });

    const newPost = postRepository.create({
        ...postData,
        user: resUser!,
    });

    await postRepository.save(newPost);

    return newPost;
};

export { newPostService };
