import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IPosts, IPostsUpdate } from '../interfaces/posts/postsInterface';
import { deletePostService } from '../services/posts/deletePost.service';
import { listPostByIdService } from '../services/posts/listPostById.service';
import { listPostsService } from '../services/posts/listPosts.service';
import { newPostService } from '../services/posts/newPost.service';
import { updatePostService } from '../services/posts/updatePost.service';

const listPostsController = async (req: Request, res: Response) => {
    const posts = await listPostsService();

    return res.status(200).json(instanceToPlain(posts));
};

const newPostController = async (req: Request, res: Response) => {
    const postData: IPosts = req.body;
    const newPost = await newPostService(postData);
    return res.status(201).json(newPost);
};

const listPostByIdController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const postById = await listPostByIdService(id);
    return res.status(200).json(postById);
};

const updatePostController = async (req: Request, res: Response) => {
    const userData: IPostsUpdate = req.body;
    const postId: string = req.params.id;

    const updatedPost = await updatePostService(userData, postId);

    return res.status(200).json(updatedPost);
};

const deletePostController = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deletePostService(id);

    return res.status(204).json({ message: 'Post deleted.' });
};

export {
    listPostsController,
    newPostController,
    listPostByIdController,
    updatePostController,
    deletePostController,
};
