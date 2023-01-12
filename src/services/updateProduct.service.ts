import { AppDataSource } from '../data-source'
import { Product } from '../entities/products.entities'
import { AppError } from '../errors/appError'
import { IProduct, IUpdateProduct } from '../interfaces/products'
import { returnedProductSchema } from '../schemas/products.schema'

const updateProductService = async (data: IUpdateProduct ,productId: string): Promise<IProduct> => {
    const productRepository = AppDataSource.getRepository(Product)

    const product = productRepository.findOneBy({ id: productId })
    if(!product){
        throw new AppError('This product does not exist', 401)
    }

    const updatedProduct = productRepository.create({
        ...product,
        ...data
    })

    const returnedProduct = returnedProductSchema.validate(updatedProduct, {
        stripUnknown: true
    })

    return returnedProduct
}

export { updateProductService }