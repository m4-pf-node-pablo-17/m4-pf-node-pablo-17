import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  listAllMessagesFromPostController
} from '../controllers/comment.controller';
import ensureIsOwnerMiddleware from '../middlewares/comments/ensureIsOwner.middleware';
import ensureAuthMiddleware from '../middlewares/users/ensureAuth.middleware';

const commentRoutes = Router();

commentRoutes.post('/:id', ensureAuthMiddleware, createCommentController);
commentRoutes.patch('/:id', ensureAuthMiddleware, ensureIsOwnerMiddleware, updateCommentController);
commentRoutes.delete('/:id', ensureAuthMiddleware, ensureIsOwnerMiddleware, deleteCommentController);
commentRoutes.get('/:id/posts', ensureAuthMiddleware, listAllMessagesFromPostController)

export default commentRoutes;