import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import {
  ICommentRequest,
  ICommentResponse,
} from '../../interfaces/comment/commentInterface';
import { respCommentSchema } from '../../schemas/comment/schemaComment';

const createCommentService = async (
  text: ICommentRequest
): Promise<ICommentResponse> => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const createComment = commentRepository.create(text);
  await commentRepository.save(createComment);
  const resComment = await respCommentSchema.validate(createComment, {
    stripUnknown: true,
  });

  return resComment;
};

export default createCommentService;
