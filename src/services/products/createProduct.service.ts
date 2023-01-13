import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'
import { User } from '../../entities/user.entity'
import { IProduct, IProductRequest } from '../../interfaces/products'
import { returnedProductSchema } from '../../schemas/products/products.schema'

const createProductService = async ({ name, description, image, price, quantity }: IProductRequest, userId: string ): Promise<IProduct> => {
    
    const productRepository = AppDataSource.getRepository(Product)
    const userRepository    = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: userId
    })

    const productData = productRepository.create({
        name: name,
        description: description,
        image: image,
        price: price,
        quantity: quantity,
        user: user!
    })
    await productRepository.save(productData)

    const returnedProduct = await returnedProductSchema.validate(productData, {
        stripUnknown: true
    })
    return returnedProduct
}

export default createProductService