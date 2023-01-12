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
import ensureIsAdmMiddleware from "../middlewares/users/ensureIsStore.middleware";
import ensureOwnerIsAdmMiddleware from "../middlewares/users/ensureOwner.middleware";
import { userSchema } from "../schemas/user/schemaUser";

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

userRoutes.post(
  "",
  ensureExistsUserMiddleware(userSchema),
  createUserController
);

userRoutes.delete(
  "/:id",
  ensureExistUserIDMiddleware,
  ensureAuthMiddleware,
  deleteUserController
);

export default userRoutes;
