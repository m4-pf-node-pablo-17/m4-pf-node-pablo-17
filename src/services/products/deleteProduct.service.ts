import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'
import { AppError } from '../../errors/appError'

const deleteProductService = async (productId: string): Promise<string> => {
    const productRepository = AppDataSource.getRepository(Product)
    
    const product = await productRepository.findOneBy({ id: productId })
    if(!product){
        throw new AppError('This product does not exist', 401)
    }

    await productRepository.softRemove(product)
    await productRepository.save({...product, isActive: false})
    
    return 'Product deleted'
}

export default deleteProductService