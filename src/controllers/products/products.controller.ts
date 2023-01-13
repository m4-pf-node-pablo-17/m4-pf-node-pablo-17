import { Request, Response } from 'express';
import { deleteProductService } from '../../services/deleteProduct.service';
import listProductsByUserService from '../../services/listProductsByUser.service';
import createProductService from '../../services/products/createProduct.service';
import listAllProductsService from '../../services/products/listAllProducts.service';
import listProductByIdService from '../../services/products/listProductById.service';
import { updateProductService } from '../../services/updateProduct.service';

const listProductsByUserController = async (req: Request, res: Response) => {
    const paramsId = req.params.id

    const list = await listProductsByUserService(paramsId)
    return res.json(list)
}

const updateProductController = async (req: Request, res: Response) => {
    const data = req.body
    const paramsId = req.params.id

    const product = await updateProductService(data, paramsId)
    return res.json(product)
}

const deleteProductController = async (req: Request, res: Response) => {
    const paramsId = req.params.id

    const product = await deleteProductService(paramsId)
    return res.status(204).json(product)
}

const listAllProductsController = async (req: Request, res: Response) => {
    const products = await listAllProductsService()

    return res.status(200).json(products)
}

const createProductController = async (req: Request, res: Response) => {
    const dataProduct = req.body
    
    const createdProduct = createProductService(dataProduct)

    return res.status(201).json(createdProduct)
}

const listProductByIdController = async (req: Request, res: Response) => {    
    const paramsId = req.params.id

    const product = await listProductByIdService(paramsId)

    return res.status(200).json(product)
}

export { 
    listProductsByUserController, 
    updateProductController, 
    deleteProductController,
    listAllProductsController,
    createProductController,
    listProductByIdController
}