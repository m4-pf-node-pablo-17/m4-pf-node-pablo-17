import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controller";

const userRoutes = Router();

userRoutes.get("", listUsersController);
userRoutes.get("/:id", listUserByIdController);
userRoutes.patch("/:id", updateUserController);
userRoutes.post("", createUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
