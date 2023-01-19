import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { ICommentUpdate } from '../../interfaces/comment/commentInterface';

const updateCommentService = async (
    text: ICommentUpdate,
    commentId: string
) => {
    const commentRepository = AppDataSource.getRepository(Comment);

    const findComment = await commentRepository.findOneBy({
        id: commentId,
    });

    const updatedComment = commentRepository.create({
        ...findComment,
        ...text,
    });

    await commentRepository.save(updatedComment);
    return updatedComment;
};

export default updateCommentService;
