import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const deleteUserService = async (idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: idUser });

  if (!findUser) {
    throw new AppError('User not found', 404);
  }

  const findUserDelete = findUser.isActive;

  if (!findUserDelete) {
    throw new AppError('isActive user', 400);
  }

  const deletedUser = await userRepository.update(idUser, { isActive: false });

  return deletedUser;
};

export { deleteUserService };
