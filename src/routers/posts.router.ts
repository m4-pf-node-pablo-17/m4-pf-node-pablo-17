import { Router } from 'express';
import {
    deletePostController,
    listPostByIdController,
    listPostsController,
    newPostController,
    updatePostController,
} from '../controllers/posts.controller';
import ensureDataMiddleware from '../middlewares/products/ensureData.middleware';
import ensureAuthMiddleware from '../middlewares/users/ensureAuth.middleware';
import { respPostsSchema } from '../schemas/posts/schemaPosts';
import { updateSchema } from '../schemas/user/schemaUser';

const postsRoutes = Router();

postsRoutes.get('', ensureAuthMiddleware, listPostsController);
postsRoutes.post(
    '',
    ensureAuthMiddleware,
    ensureDataMiddleware(respPostsSchema),
    newPostController
);
postsRoutes.get('/:id', ensureAuthMiddleware, listPostByIdController);
postsRoutes.patch(
    '/:id',
    ensureAuthMiddleware,
    ensureDataMiddleware(updateSchema),
    updatePostController
);
postsRoutes.delete('/:id', ensureAuthMiddleware, deletePostController);

export default postsRoutes;
