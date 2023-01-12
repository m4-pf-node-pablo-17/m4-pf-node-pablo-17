import * as yup from 'yup'
import { SchemaOf } from 'yup';
import { IProduct, IProductRequest, IUpdateProduct } from '../interfaces/products';

const createProductSchema: SchemaOf<IProductRequest> = yup.object().shape({
  name: yup.string().max(50).required(),
  description: yup.string().max(300).required(),
  image: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required()
})

const returnedProductSchema: SchemaOf<IProduct> = yup.object().shape({
    id: yup.string().uuid(),
    name: yup.string().max(50),
    description: yup.string().max(300),
    image: yup.string(),
    price: yup.number(),
    quantity: yup.number(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    deleteAt: yup.date()
})

const updateProductSchema: SchemaOf<IUpdateProduct> = yup.object().shape({
    name: yup.string().max(50),
    description: yup.string().max(300),
    image: yup.string(),
    price: yup.number(),
    quantity: yup.number()
})

const productsListSchema: SchemaOf<IProduct[]> = yup.array(returnedProductSchema)

export { createProductSchema, returnedProductSchema, updateProductSchema, productsListSchema }