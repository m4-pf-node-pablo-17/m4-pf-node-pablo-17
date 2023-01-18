import { sign } from "jsonwebtoken"
import request from "supertest"
import { DataSource, Repository } from "typeorm"
import { app } from "../../../app"
import { AppDataSource } from "../../../data-source"
import { Product } from "../../../entities/products.entities"
import { User } from "../../../entities/user.entity"
import { mockedListProducts, mockedLoginProductUser, mockedProductRequest } from "../../mocks/integration/products.mock"
import { mockedCreateUser } from "../../mocks/integration/user.mock"

describe("/products", () => {
    let connection: DataSource
    const repository: Repository<Product> = AppDataSource.getRepository(Product)
    const userRepository = AppDataSource.getRepository(User)

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then(async (res) => {
            connection = res
            for await (const product of mockedListProducts) {
                await res.getRepository(Product).save({...product})
            }
        })
        .catch(err => console.error(err))
    })
    
    // beforeEach(async () => {
    //     const user = await userRepository.find()
    //     await userRepository.remove(user)
    // })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /products - Should be able to create a product", async () => {
        await request(app).post('/users').send(mockedCreateUser)
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser)

        const token = `Bearer ${userLoginResponse.body.tokenUser}`

        const response = await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("image")
        expect(response.body).toHaveProperty("price")
        expect(response.body).toHaveProperty("quantity")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
    })
})