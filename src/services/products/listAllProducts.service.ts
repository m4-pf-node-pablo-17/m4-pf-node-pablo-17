import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entities"

const listAllProductsService = async () => {

    const productRepository = AppDataSource.getRepository(Product)
    const listProducts = await productRepository.find()

    return listProducts
}

export default listAllProductsService