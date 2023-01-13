import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entities"
import { productsListSchema } from "../../schemas/products.schema"

const listAllProductsService = async () => {

    const productRepository = AppDataSource.getRepository(Product)
    const listProducts = await productRepository.find()
    // console.log(listProducts)

    const returnedList = await productsListSchema.validate(listProducts, {
        stripUnknown: true
    })
    // console.log(returnedList)

    return returnedList
}

export default listAllProductsService