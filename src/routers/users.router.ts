import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsStore.middleware";
import ensureOwnerIsAdmMiddleware from "../middlewares/ensureOwner.middleware";

const userRoutes = Router();

userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUserByIdController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOwnerIsAdmMiddleware,
  updateUserController
);
userRoutes.post("", createUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
