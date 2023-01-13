import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entities"

const createProductService = async (dataProduct: object) => {
    
    const productRepository = AppDataSource.getRepository(Product)

    const productData = productRepository.create(dataProduct)

    await productRepository.save(productData)

    return productData;
}

export default createProductService