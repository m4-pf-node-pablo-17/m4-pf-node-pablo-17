import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entities"
import { IProductRequest } from "../../interfaces/products"
import { createProductSchema } from "../../schemas/products.schema"

const createProductService = async (dataProduct: IProductRequest) => {
    
    const productRepository = AppDataSource.getRepository(Product)

    const productData = productRepository.create(dataProduct)
console.log(productData)
    await productRepository.save(productData)

    const returnedProduct = createProductSchema.validate(productData, {
        stripUnknown: true
    })
    return returnedProduct
}

export default createProductService