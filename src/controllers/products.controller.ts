import { Request, Response } from 'express'
import { IProductRequest, IUpdateProduct } from '../interfaces/products'
import createProductService from '../services/products/createProduct.service'
import deleteProductService from '../services/products/deleteProduct.service'
import listAllProductsService from '../services/products/listAllProducts.service'
import listProductByIdService from '../services/products/listProductById.service'
import listProductsByUserService from '../services/products/listProductsByUser.service'
import updateProductService from '../services/products/updateProduct.service'


const createProductController = async (req: Request, res: Response) => {
    const {
            name,
            description,
            image,
            price, 
            quantity,
    }: IProductRequest = req.body
    const userId       = req.user.id
    
    const createdProduct = await createProductService({
        name,
        description,
        image,
        price, 
        quantity,
   
    }, userId)

    return res.status(201).json(createdProduct)
}

const listAllProductsController = async (req: Request, res: Response) => {
    const products = await listAllProductsService()
    
    return res.status(200).json(products)
}

const listProductByIdController = async (req: Request, res: Response) => {    
    const paramsId = req.params.id

    const product = await listProductByIdService(paramsId)

    return res.status(200).json(product)
}

const listProductsByUserController = async (req: Request, res: Response) => {
    const paramsId = req.params.id

    const list = await listProductsByUserService(paramsId)

    return res.status(200).json(list)
}

const updateProductController = async (req: Request, res: Response) => {
    const data: IUpdateProduct = req.body
    
    const paramsId = req.params.id

    const product = await updateProductService(data, paramsId)
    
    return res.status(200).json(product)
}

const deleteProductController = async (req: Request, res: Response) => {
    const paramsId = req.params.id

    const product = await deleteProductService(paramsId)

    return res.status(204).json(product)
}

export { 
    listProductsByUserController, 
    updateProductController, 
    deleteProductController,
    listAllProductsController,
    createProductController,
    listProductByIdController
}