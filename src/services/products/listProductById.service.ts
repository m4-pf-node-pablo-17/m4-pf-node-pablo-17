import { AppDataSource } from '../../data-source';
import { Product } from '../../entities/products.entities';
import { IProductInfo } from '../../interfaces/products';
import { returnedInfoProductSchema } from '../../schemas/products/products.schema';

const listProductByIdService = async (
    paramsId: string
): Promise<IProductInfo | undefined> => {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
        id: paramsId,
    });

    const returnedProduct = await returnedInfoProductSchema.validate(product, {
        stripUnknown: true,
    });

    return returnedProduct;
};

export default listProductByIdService;
