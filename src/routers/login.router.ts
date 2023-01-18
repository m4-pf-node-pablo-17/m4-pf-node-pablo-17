import { Router } from 'express';
import { loginUserController } from '../controllers/users.controller';

const loginRouter = Router();

loginRouter.post('', loginUserController);

export { loginRouter };
