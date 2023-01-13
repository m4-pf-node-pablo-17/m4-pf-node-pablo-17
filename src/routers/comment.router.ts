import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} from '../controllers/comment.controller';

const commentRoutes = Router();

commentRoutes.post('', createCommentController);
commentRoutes.patch('', updateCommentController);
commentRoutes.delete('', deleteCommentController);

export default commentRoutes;
