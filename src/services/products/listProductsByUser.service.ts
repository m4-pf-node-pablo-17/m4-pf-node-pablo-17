import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { IProductInfo } from '../../interfaces/products';
import { productsByUserListSchema } from '../../schemas/products/products.schema';

const listProductsByUserService = async (
    userId: string
): Promise<IProductInfo[] | undefined> => {
    const userRepository = AppDataSource.getRepository(User);

    const userList = await userRepository.findOne({
        where: { id: userId },
        relations: { products: true },
    });

    const returnedList = await productsByUserListSchema.validate(
        userList?.products,
        {
            stripUnknown: true,
        }
    );

    return returnedList;
};

export default listProductsByUserService;
