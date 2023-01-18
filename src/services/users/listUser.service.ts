import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { IUserResponse } from '../../interfaces/user/userInterface';
import { listRespUserSchema } from '../../schemas/user/schemaUser';

const listUsersService = async (): Promise<IUserResponse[]> => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const respUser = await listRespUserSchema.validate(users, {
        stripUnknown: true,
    });

    return respUser!;
};

export default listUsersService;
