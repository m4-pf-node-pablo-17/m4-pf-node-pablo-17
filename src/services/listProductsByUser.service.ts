import { AppDataSource } from '../data-source'
import { Product } from '../entities/products.entities'
import { User } from '../entities/user.entity'

const listProductsByUserService = async (id: string) => {
    // const productsRepository = AppDataSource.getRepository(Product)

    // const productsList = productsRepository.findOne({
    //     where: {
    //         user: id
    //     },
    //     relations: {
    //         user: true
    //     }
    // })

    const userRepository = AppDataSource.getRepository(User)

    const userList = userRepository.findOne({
        where: { id: id },
        relations: { products: true }
    })

    return userList
}

export default listProductsByUserService