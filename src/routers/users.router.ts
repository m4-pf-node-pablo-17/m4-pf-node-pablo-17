import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/users/ensureAuth.middleware";
import { ensureExistsUserMiddleware } from "../middlewares/users/ensureExistsUser.middleware";
import { ensureExistUserIDMiddleware } from "../middlewares/users/ensureExistUserID.middleware";
import ensureOwnerIsAdmMiddleware from "../middlewares/users/ensureOwner.middleware";
import { userSchema } from "../schemas/user/schemaUser";

const userRoutes = Router();

userRoutes.get("", ensureAuthMiddleware, listUsersController);

userRoutes.get(
  "/:id",
  ensureExistUserIDMiddleware,
  ensureAuthMiddleware,
  listUserByIdController
);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureExistUserIDMiddleware,
  ensureOwnerIsAdmMiddleware,
  updateUserController
);

userRoutes.post(
  "",
  ensureExistsUserMiddleware(userSchema),
  createUserController
);

userRoutes.delete(
  "/:id",
  ensureExistUserIDMiddleware,
  ensureAuthMiddleware,
  ensureOwnerIsAdmMiddleware,
  deleteUserController
);

export default userRoutes;
