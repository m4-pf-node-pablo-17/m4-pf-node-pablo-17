import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  listAllMessagesFromPostController
} from '../controllers/comment.controller';
import ensureAuthMiddleware from '../middlewares/users/ensureAuth.middleware';

const commentRoutes = Router();

commentRoutes.post('/:id', ensureAuthMiddleware, createCommentController);
commentRoutes.patch('/:id', ensureAuthMiddleware, updateCommentController);
commentRoutes.delete('/:id', ensureAuthMiddleware, deleteCommentController);
commentRoutes.get('/:id/posts', ensureAuthMiddleware, listAllMessagesFromPostController)

export default commentRoutes;
