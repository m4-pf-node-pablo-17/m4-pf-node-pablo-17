import { Router } from 'express'
import { 
    createProductController, 
    deleteProductController, 
    listAllProductsController, 
    listProductByIdController, 
    listProductsByUserController,
    updateProductController
} from '../controllers/products.controller'
import ensureAuthMiddleware from '../middlewares/users/ensureAuth.middleware'

const productRouter = Router()

productRouter.get('', ensureAuthMiddleware, listAllProductsController)
productRouter.post('', ensureAuthMiddleware, createProductController)
productRouter.get('/:id', ensureAuthMiddleware, listProductByIdController)
productRouter.get('/:id', ensureAuthMiddleware, listProductsByUserController)
productRouter.patch('/:id', ensureAuthMiddleware, updateProductController)
productRouter.delete('/:id', ensureAuthMiddleware, deleteProductController)

export default productRouter