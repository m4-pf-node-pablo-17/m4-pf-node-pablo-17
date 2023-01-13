import { Request, Response } from 'express';
import {
  ICommentRequest,
  ICommentUpdate,
} from '../interfaces/comment/commentInterface';
import createCommentService from '../services/comment/createComment.service';
import deleteCommentService from '../services/comment/deleteComment.service';
import updateCommentService from '../services/comment/updateComment.service';

const createCommentController = async (req: Request, res: Response) => {
  const comment: ICommentRequest = req.body;
  const createComment = await createCommentService(comment);
  return res.status(201).json(createComment);
};

const updateCommentController = async (req: Request, res: Response) => {
  const text: ICommentUpdate = req.body;
  const commentId = req.params.id;
  const updatedComment = await updateCommentService(text, commentId);
  return res.status(200).json(updatedComment);
};

const deleteCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const deletedComment = await deleteCommentService(commentId);
  return res.status(204).json(deletedComment);
};

export {
  createCommentController,
  updateCommentController,
  deleteCommentController,
};
