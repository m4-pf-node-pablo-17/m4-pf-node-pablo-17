import { Router } from "express";
import { createProductController, listAllProductsController, listProductByIdController } from "../controllers/products/products.controller";

const productRouter = Router()

productRouter.get("", listAllProductsController)

productRouter.post("", createProductController)

productRouter.get("/:id", listProductByIdController)

export default productRouter