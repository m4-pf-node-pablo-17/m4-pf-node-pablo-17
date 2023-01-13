import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { AppError } from '../../errors/appError';

const deleteCommentService = async (commentId: string) => {
  const getCommentRepository = AppDataSource.getRepository(Comment);

  const findComment = await getCommentRepository.findOneBy({ id: commentId });

  if (!findComment) {
    throw new AppError('Comment not found', 404);
  }

  return 'Deleted Comment';
};

export default deleteCommentService;
