import { Request, Response } from "express";
import { deleteProductService } from "../../services/deleteProduct.service";
import listProductsByUserService from "../../services/listProductsByUser.service";
import { updateProductService } from "../../services/updateProduct.service";

const listProductsByUserController = async (req: Request, res: Response) => {
    const list = await listProductsByUserService(req.params.id)
    return res.json(list)
}

const updateProductController = async (req: Request, res: Response) => {
    const product = await updateProductService(req.body, req.params.id)
    return res.json(product)
}

const deleteProductController = async (req: Request, res: Response) => {
    const product = await deleteProductService(req.params.id)
    return res.status(204).json(product)
}

export { listProductsByUserController, updateProductController, deleteProductController }