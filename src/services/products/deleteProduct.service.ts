import { AppDataSource } from '../../data-source'
import { Product } from '../../entities/products.entities'

const deleteProductService = async (productId: string): Promise<string> => {
    const productRepository = AppDataSource.getRepository(Product)
    
    const product = await productRepository.findOneBy({ id: productId })

    await productRepository.softRemove(product!)
    await productRepository.save({
        ...product, 
        isActive: false
    })
    
    return 'Product deleted'
}

export default deleteProductService