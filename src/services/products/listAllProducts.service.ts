import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'
import { IProduct } from '../../interfaces/products'
import { productsListSchema } from '../../schemas/products/products.schema'

const listAllProductsService = async (): Promise<IProduct[] | undefined> => {

    const productRepository = AppDataSource.getRepository(Product)
    const listProducts = await productRepository.find()

    const returnedList = await productsListSchema.validate(listProducts, {
        stripUnknown: true
    })

    return returnedList
}

export default listAllProductsService