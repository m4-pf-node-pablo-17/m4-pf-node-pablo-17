import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  listAllMessagesFromPostController
} from '../controllers/comment.controller';

const commentRoutes = Router();

commentRoutes.post('/:id', createCommentController);
commentRoutes.patch('', updateCommentController);
commentRoutes.delete('', deleteCommentController);
commentRoutes.get('/:id/posts', listAllMessagesFromPostController)

export default commentRoutes;
