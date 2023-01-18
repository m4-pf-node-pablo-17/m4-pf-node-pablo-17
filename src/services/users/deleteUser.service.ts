import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const deleteUserService = async (idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: idUser });

  if (!findUser) {
    throw new AppError('User not found', 404);
  }

  if (!findUser?.isActive) {
    throw new AppError('inactive user', 400);
  }

  await userRepository.softRemove(findUser);

  const respUserDeleted = await userRepository.save({
    ...findUser,
    isActive: false,
  });

  return respUserDeleted;
};

export { deleteUserService };
