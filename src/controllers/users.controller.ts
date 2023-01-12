import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import {
  IUserLogin,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/user/userInterface";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUser.service";
import { loginUserService } from "../services/users/loginUser.service";
import updateUserService from "../services/users/updateUser.service";

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

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createUser = await createUserService(user);
  return res.status(201).json(createUser);
};

const loginUserController = async (req: Request, res: Response) => {
  const loginDate: IUserLogin = req.body;
  const tokenUser = await loginUserService(loginDate);
  return res.status(200).json({ tokenUser });
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const deleteUser = await deleteUserService(userId);
  return res.status(204).json({ message: deleteUser });
};

export {
  listUsersController,
  listUserByIdController,
  updateUserController,
  createUserController,
  loginUserController,
  deleteUserController,
};
