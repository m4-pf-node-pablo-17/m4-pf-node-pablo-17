import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'
import { IProduct } from '../../interfaces/products'
import { returnedProductSchema } from '../../schemas/products/products.schema'

const listProductByIdService = async (paramsId: string): Promise<IProduct | undefined> => {
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOneBy({
        id: paramsId
    })

    const returnedProduct = await returnedProductSchema.validate(product, {
        stripUnknown: true
    })

    return returnedProduct
}

export default listProductByIdService