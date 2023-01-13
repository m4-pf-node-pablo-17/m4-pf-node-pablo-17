import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'
import { IProduct, IUpdateProduct } from '../../interfaces/products'
import { returnedProductSchema } from '../../schemas/products/products.schema'

const updateProductService = async (data: IUpdateProduct, productId: string): Promise<IProduct> => {
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOneBy({ id: productId })

    const updatedProduct = productRepository.create({
        ...product,
        ...data
    })
    await productRepository.save(updatedProduct)

    const returnedProduct = returnedProductSchema.validate(updatedProduct, {
        stripUnknown: true
    })

    return returnedProduct
}

export default updateProductService