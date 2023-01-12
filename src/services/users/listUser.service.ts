import { AppDataSource } from '../../data-source';
import { IUser } from '../../interfaces/user/userInterface';
import { User } from '../../entities/user.entity';

const listUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default listUsersService;
