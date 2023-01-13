import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { deleteProductService } from '../../services/deleteProduct.service';
import listProductsByUserService from '../../services/listProductsByUser.service';
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

const listProductsController = async (req: Request, res: Response) => {
    
}

export { 
    listProductsByUserController, 
    updateProductController, 
    deleteProductController 
}