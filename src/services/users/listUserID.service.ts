import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { respUserSchema } from "../../schemas/user/schemaUser";

const listUserIDService = async (idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: idUser });

  const respUser = await respUserSchema.validate(findUser, {
    stripUnknown: true,
  });

  return respUser;
};

export { listUserIDService };
