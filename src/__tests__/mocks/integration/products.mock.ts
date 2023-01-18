import {
    IProduct,
    IProductRequest,
    IUpdateProduct,
} from '../../../interfaces/products';
import { IUserLogin } from '../../../interfaces/user/userInterface';

const mockedProductRequest: IProductRequest = {
    name: 'Carrinho de bebê',
    description: 'Carrinho de bebÊ na cor preta',
    image: 'https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg',
    price: 175.5,
    quantity: 13,
};

const mockedProductInvalidRequest: Omit<
    IProductRequest,
    'description' | 'price'
> = {
    name: 'Carrinho de bebê',
    image: 'https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg',
    quantity: 13,
};

const mockedLoginProductUser: IUserLogin = {
    email: 'SddsHeroku@gmail.com',
    password: '123456',
};

const mockedListProducts: IProduct[] = [
    {
        id: '13820c7b-7762-4dd5-9916-779ae0f85704',
        name: 'Carrinho de Bebê',
        description: 'Carrinho de bebê na cor preta',
        image: 'https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg',
        price: 173.5,
        quantity: 2,
        createdAt: new Date('2023-01-13 15:58:04.544'),
        updatedAt: new Date('2023-01-13 15:58:04.544'),
        user: {
            image: 'https://source.unsplash.com/random',
            name: 'Jolyne Kujo',
            email: 'stoneocean@gmail.com',
            contact: '81997142273',
            register: '37213020294',
            isStore: false,
        },
        isActive: false,
    },
    {
        id: 'be863fae-442d-41b0-bd7a-46abf35704eb',
        name: 'Chocalho',
        description: 'Chocalho de plástico',
        image: 'https://m.media-amazon.com/images/I/51DB22Cr2RL._AC_SX569_.jpg',
        price: 13.25,
        quantity: 29,
        createdAt: new Date('2023-01-13 15:58:04.544'),
        updatedAt: new Date('2023-01-13 15:58:04.544'),
        user: {
            image: 'https://source.unsplash.com/random',
            name: 'Jolyne Kujo',
            email: 'stoneocean@gmail.com',
            contact: '81997142273',
            register: '37213020294',
            isStore: false,
        },
        isActive: true,
    },
];

const updatedProductValues: IUpdateProduct = {
    name: 'Carrinho Infantil',
    price: 207.5,
};

export {
    mockedProductRequest,
    mockedProductInvalidRequest,
    mockedLoginProductUser,
    mockedListProducts,
    updatedProductValues,
};
