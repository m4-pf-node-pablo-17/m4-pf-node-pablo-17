import { sign } from "jsonwebtoken"
import request from "supertest"
import { DataSource, Repository } from "typeorm"
import { app } from "../../../app"
import { AppDataSource } from "../../../data-source"
import { Product } from "../../../entities/products.entities"
import { mockedProductRequest } from "../../mocks/integration/products.mock"

describe("Creating products routes test", () => {
    let connection: DataSource
    const baseURL: string = "/products"
    const repository: Repository<Product> = AppDataSource.getRepository(Product)

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Should be able to create a product", async () => {
        const token = sign(
            { isStore: true || false, isActive: true },
            process.env.SECRET_KEY,
            {
              subject: '1',
            }
          );
        
        const response = await request(app)
            .post(baseURL)
            .set('Authorization', `Bearer ${token}`)
            .send(mockedProductRequest)

        const expectedResults = {
            status: 201,
            bodyToContain: "id"
        }

        expect(response.status).toBe(expectedResults.status)
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
    })
})