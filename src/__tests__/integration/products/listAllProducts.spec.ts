import request from 'supertest'
import { DataSource, Repository } from 'typeorm'
import { app } from '../../../app'
import listAllProductsService from '../../../services/products/listAllProducts.service'
import { AppDataSource } from '../../../data-source'
import { Product } from '../../../entities/products.entities'
import { User } from '../../../entities/user.entity'
import { mockedCreateUser } from '../../mocks/integration/user.mock'
import { mockedListProducts, mockedLoginProductUser, mockedProductRequest } from '../../mocks/integration/products.mock'
import { boolean } from 'yup'
import { IUserResponse } from '../../../interfaces/user/userInterface'
import { IProduct } from '../../../interfaces/products'

describe('Tests for list all products function', () => {
    let connection: DataSource 
    const userRepository: Repository<Product> = AppDataSource.getRepository(Product)
    
    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => connection = res)
            .catch((err) => console.error(err))
    })

    beforeEach(async () => {
        const products = await userRepository.find()
        await userRepository.remove(products)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test('GET /products - Must be able to list all products', async () => {
        await request(app)
        .post('/users')
        .send(mockedCreateUser)

        const userLoginResponse = await request(app)
        .post('/login')
        .send(mockedLoginProductUser)

        const token = `Bearer ${userLoginResponse.body.tokenUser}`

        await request(app)
        .post('/products')
        .set('Authorization', token)
        .send(mockedProductRequest)

        const response = await request(app)
        .get('/products')
        .set('Authorization', token)   

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ user: expect.objectContaining({
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    isActive: expect.any(Boolean),
                    isStore: expect.any(Boolean),
                    register: expect.any(String),
                    contact: expect.any(String),
                    email: expect.any(String),
                    name: expect.any(String),
                    image: expect.any(String),
                    id: expect.any(String)
                }),
                isActive: expect.any(Boolean),
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                quantity: expect.any(Number),
                price: expect.any(Number),
                image: expect.any(String),
                description: expect.any(String),
                name: expect.any(String),
                id: expect.any(String)
                })
            ])
        )
    })

    test('GET /products/:id - Must be able to list one product', async () => {
        await request(app)
        .post('/users')
        .send(mockedCreateUser)

        const userLoginResponse = await request(app)
        .post('/login')
        .send(mockedLoginProductUser)

        const token = `Bearer ${userLoginResponse.body.tokenUser}`

        await request(app)
        .post('/products')
        .set('Authorization', token)
        .send(mockedProductRequest)

        const product = await request(app)
        .get('/products')
        .set('Authorization', token)

        const response = await request(app)
        .get(`/products/${product.body[0].id}`)
        .set('Authorization', token)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
                expect.objectContaining({
                    isActive: expect.any(Boolean),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    quantity: expect.any(Number),
                    price: expect.any(Number),
                    image: expect.any(String),
                    description: expect.any(String),
                    name: expect.any(String),
                    id: expect.any(String)
                })
        )
    })

    // it('Should be not be able to list users | missing token')
})