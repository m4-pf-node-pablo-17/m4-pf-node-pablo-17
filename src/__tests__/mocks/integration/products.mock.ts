import { IProductRequest } from "../../../interfaces/products"

const mockedProductRequest: IProductRequest = {
    name: "Carrinho de bebê",
    description: "Carrinho de bebÊ na cor preta",
    image: "https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg",
    price: 175.50,
    quantity: 13
}

const mockedProductInvalidRequest: Omit<IProductRequest, "description" | "price"> = {
    name: "Carrinho de bebê",
    image: "https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg",
    quantity: 13
}

export { mockedProductRequest, mockedProductInvalidRequest }