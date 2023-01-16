import { Request, Response } from 'express';
import {
  ICommentRequest,
  ICommentUpdate,
} from '../interfaces/comment/commentInterface';
import createCommentService from '../services/comment/createComment.service';
import deleteCommentService from '../services/comment/deleteComment.service';
import updateCommentService from '../services/comment/updateComment.service';
import listAllMessagesFromPostService from '../services/comment/listAllMessagesFromPost.service';

const createCommentController = async (req: Request, res: Response) => {
  console.log('teste');
  
  const comment = req.body;
  const idPost: string = req.params.id
  const userId = req.user.id

  const createComment = await createCommentService(comment, idPost, userId);
  return res.status(201).json(createComment);
};

const updateCommentController = async (req: Request, res: Response) => {
  console.log("ALOU");
  const text: ICommentUpdate = req.body;
  const commentId: string = req.params.id;
  const updatedComment = await updateCommentService(text, commentId);
  return res.status(200).json(updatedComment);
};

const deleteCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const deletedComment = await deleteCommentService(commentId);
  return res.status(204).json(deletedComment);
};

const listAllMessagesFromPostController = async (req: Request, res: Response) => {
  const messageId: string = req.params.id
  const posts = await listAllMessagesFromPostService(messageId)
  return res.json(posts)
}

export {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  listAllMessagesFromPostController
};
