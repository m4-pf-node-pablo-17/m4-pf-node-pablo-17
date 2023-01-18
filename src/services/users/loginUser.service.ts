import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserLogin } from '../../interfaces/user/userInterface';

const loginUserService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User);

    const findUsers = await userRepository.findOneBy({ email: email });

    if (!findUsers) {
        throw new AppError('Password or email incorrect', 403);
    }

    if (findUsers!.isActive === false) {
        throw new AppError('Inactive user', 400);
    }

    const checkPassword = await compare(password, findUsers.password);
    if (!checkPassword) {
        throw new AppError('Password or email incorrect', 403);
    }

    const tokenUser = jwt.sign(
        { isStore: findUsers.isStore, isActive: findUsers.isActive },
        process.env.SECRET_KEY!,
        {
            subject: findUsers.id,
            expiresIn: '24h',
        }
    );

    return tokenUser;
};

export { loginUserService };
