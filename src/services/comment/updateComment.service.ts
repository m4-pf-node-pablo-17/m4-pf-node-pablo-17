import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { AppError } from '../../errors/appError';
import {
  IComment,
  ICommentUpdate,
} from '../../interfaces/comment/commentInterface';

const updateCommentService = async (
  text: ICommentUpdate,
  commentId: string
) => {
  
  const commentRepository = AppDataSource.getRepository(Comment);

  const findComment = await commentRepository.findOneBy({
    id: commentId,
  });
  // const { id, text } = findComment

  // if (!findComment) {
  //   console.log("TESTE");
    
  //   throw new AppError('comment not found1241r51414', 404);
  // }

  const updatedComment = commentRepository.create({
    ...findComment,
    ...text,
  });

  await commentRepository.save(updatedComment);
  return updatedComment;
};

export default updateCommentService;
