import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { PageContent } from '../../entities/pageContent.entity';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { ICommentRequest } from '../../interfaces/comment/commentInterface';

const createCommentService = async (
    dataText: ICommentRequest,
    id_post: string,
    userId: string
) => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOneBy({
        id: id_post,
    });
    const pageContentRepository = AppDataSource.getRepository(PageContent);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
        id: userId,
    });
    console.log('USUARIO', user);

    const createComment = commentRepository.create({
        ...dataText,
        user: user!,
    });

    const idComment = await commentRepository.save(createComment);

    const createPageContent = pageContentRepository.create({
        comments: idComment,
        post: post!,
    });
    // console.log('pagina', createPageContent);

    const idPost = await pageContentRepository.save(createPageContent);

    return idPost;
};

export default createCommentService;
