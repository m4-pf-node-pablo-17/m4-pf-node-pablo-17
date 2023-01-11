interface IProductRequest {
  name: string,
  description: string,
  image: string,
  price: number,
  quantity: number
}

interface IProduct {
  id: string | undefined,
  name: string | undefined,
  description: string | undefined,
  image: string | undefined,
  price: number | undefined,
  quantity: number | undefined,
  createdAt: Date | undefined,
  updatedAt: Date | undefined,
  deleteAt: Date | undefined
}

interface IUpdateProduct {
  name?: string,
  description?: string,
  image?: string,
  price?: number,
  quantity?: number
}

export { IProductRequest, IProduct, IUpdateProduct }