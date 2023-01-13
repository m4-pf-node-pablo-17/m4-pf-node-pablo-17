import { Router } from 'express';
import {
  listUserByIdController,
  listUsersController,
  updateUserController,
} from '../controllers/users.controller';

const userRoutes = Router();

userRoutes.get('', listUsersController);
userRoutes.get('/:id', listUserByIdController);
userRoutes.patch('/:id', updateUserController);

export default userRoutes;
