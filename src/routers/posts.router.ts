import { Router } from 'express';
import {
    deletePostController,
    listPostByIdController,
    listPostsController,
    newPostController,
    updatePostController,
} from '../controllers/posts.controller';

const postsRoutes = Router();

postsRoutes.get('', listPostsController);
postsRoutes.post('', newPostController);
postsRoutes.get('/:id', listPostByIdController);
postsRoutes.patch('/:id', updatePostController);
postsRoutes.delete('/:id', deletePostController);

export default postsRoutes;
