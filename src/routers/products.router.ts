import { Router } from 'express';
import {
    createProductController,
    deleteProductController,
    listAllProductsController,
    listProductByIdController,
    listProductsByUserController,
    updateProductController,
} from '../controllers/products.controller';
import ensureDataMiddleware from '../middlewares/products/ensureData.middleware';
import { ensureExistProductIDMiddleware } from '../middlewares/products/ensureExistProductID.middleware';
import { ensureUserIsOwnerMiddleware } from '../middlewares/products/ensureUserIsOwner.middleware';
import ensureAuthMiddleware from '../middlewares/users/ensureAuth.middleware';
import { ensureExistUserIDMiddleware } from '../middlewares/users/ensureExistUserID.middleware';
import {
    createProductSchema,
    updateProductSchema,
} from '../schemas/products/products.schema';

const productRouter = Router();

productRouter.get('', ensureAuthMiddleware, listAllProductsController);

productRouter.post(
    '',
    ensureAuthMiddleware,
    ensureDataMiddleware(createProductSchema),
    createProductController
);

productRouter.get(
    '/:id',
    ensureAuthMiddleware,
    ensureExistProductIDMiddleware,
    listProductByIdController
);

productRouter.get(
    '/users/:id',
    ensureAuthMiddleware,
    ensureExistUserIDMiddleware,
    listProductsByUserController
);

productRouter.patch(
    '/:id',
    ensureAuthMiddleware,
    ensureExistProductIDMiddleware,
    ensureUserIsOwnerMiddleware,
    ensureDataMiddleware(updateProductSchema),
    updateProductController
);

productRouter.delete(
    '/:id',
    ensureAuthMiddleware,
    ensureExistProductIDMiddleware,
    ensureUserIsOwnerMiddleware,
    deleteProductController
);

export default productRouter;
