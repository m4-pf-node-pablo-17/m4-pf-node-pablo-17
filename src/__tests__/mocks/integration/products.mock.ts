import { IProductRequest } from "../../../interfaces/products"
import { IUserLogin } from "../../../interfaces/user/userInterface";

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

const mockedLoginProductUser: IUserLogin = {
    email: 'SddsHeroku@gmail.com',
    password: '123456',
}

const mockedListProducts = [
    {
        isActive: true,
		updatedAt: "2023-01-17T21:54:35.499Z",
		createdAt: "2023-01-17T21:54:35.499Z",
		quantity: 1,
		price: 1,
		image: "string",
		description: "string",
		name: "Jeferson",
		id: "4f23dc29-3eb6-4472-9649-379b4db2ded1"
    },
    {
        isActive: true,
		updatedAt: "2023-01-17T21:54:35.499Z",
		createdAt: "2023-01-17T21:54:35.499Z",
		quantity: 1,
		price: 1,
		image: "string",
		description: "string",
		name: "Igor",
		id: "5095f05c-19b3-4a36-b41d-52ec666b9d05"
    },
    {
        isActive: true,
		updatedAt: "2023-01-17T21:54:35.499Z",
		createdAt: "2023-01-17T21:54:35.499Z",
		quantity: 1,
		price: 1,
		image: "string",
		description: "string",
		name: "Antonio",
		id: "c519240e-f74b-454f-81fa-8adf0b6af391"
    }
]

export { 
    mockedProductRequest, 
    mockedProductInvalidRequest, 
    mockedLoginProductUser,
    mockedListProducts 
}