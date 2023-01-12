import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserUpdate } from '../interfaces/user/userInterface';
import listUsersService from '../services/users/listUser.service';
import updateUserService from '../services/users/updateUser.service';

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.status(200).json(instanceToPlain(users));
};

const listUserByIdController = async (req: Request, res: Response) => {
  const id = req.body;
  return res.status(200).json(id);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const userId = req.params.id;
  const updatedUser = await updateUserService(userData, userId);
  return res.status(200).json(updatedUser);
};

export { listUsersController, listUserByIdController, updateUserController };
