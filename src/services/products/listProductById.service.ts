import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entities"

const listProductByIdService = async (paramsId: string) => {

    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOneBy({
        id: paramsId
    })

    return product
}

export default listProductByIdService