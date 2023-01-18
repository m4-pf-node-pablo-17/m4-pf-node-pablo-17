import { hash } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUser, IUserUpdate } from '../../interfaces/user/userInterface';
import { respUserSchema } from '../../schemas/user/schemaUser';

const updateUserService = async (
  userData: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const { image, name, email, password, contact, register, isStore } = userData;

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError('User not found', 404);
  }

  // const updatedUser = userRepository.create({
  //   ...findUser,
  //   ...userData,
  // });

  await userRepository.update(userId, {
    image: image ? image : findUser.image,
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
    contact: contact ? contact : findUser.contact,
    register: register ? register : findUser.register,
    isStore: isStore ? isStore : findUser.isStore,
  });

  const findUserResponse = await userRepository.findOneBy({
    id: userId,
  });

  const response = await respUserSchema.validate(findUserResponse, {
    stripUnknown: true,
  });

  return response;
};

export default updateUserService;
