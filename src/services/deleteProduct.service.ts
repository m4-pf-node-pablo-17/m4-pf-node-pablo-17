import { AppDataSource } from "../data-source"
import { Product } from "../entities/products.entities"
import { AppError } from "../errors/appError"

const deleteProductService = async (productId: string): Promise<string> => {
    const productRepository = AppDataSource.getRepository(Product)
    
    const product = productRepository.findOneBy({ id: productId })
    if(!product){
        throw new AppError("This product doesn't exist", 401)
    }

    const removedProduct = await productRepository.softRemove(product)
    await productRepository.save(removedProduct)
    
    return "Product deleted"
}

export { deleteProductService }