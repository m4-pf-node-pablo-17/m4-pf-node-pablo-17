import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { Product } from '../../../entities/products.entities';
import {
    mockedLoginProductUser,
    mockedProductInvalidRequest,
    mockedProductRequest,
    updatedProductValues,
} from '../../mocks/integration/products.mock';
import { mockedCreateUser } from '../../mocks/integration/user.mock';

describe('/products', () => {
    let connection: DataSource;
    const productRepository: Repository<Product> =
        AppDataSource.getRepository(Product);

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => console.error(err));
    });

    beforeEach(async () => {
        const product = await productRepository.find();
        await productRepository.remove(product);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /products - Should be able to create a product', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        const response = await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('image');
        expect(response.body).toHaveProperty('price');
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    test('POST /products - Should not be able to create product with invalid body', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        const response = await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductInvalidRequest);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('POST /products - Should not be able to create a product without authentication', async () => {
        const response = await request(app)
            .post('/products')
            .send(mockedProductRequest);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('GET /products - Must be able to list all products', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const response = await request(app)
            .get('/products')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    user: expect.objectContaining({
                        updatedAt: expect.any(String),
                        createdAt: expect.any(String),
                        isActive: expect.any(Boolean),
                        isStore: expect.any(Boolean),
                        register: expect.any(String),
                        contact: expect.any(String),
                        email: expect.any(String),
                        name: expect.any(String),
                        image: expect.any(String),
                        id: expect.any(String),
                    }),
                    isActive: expect.any(Boolean),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    quantity: expect.any(Number),
                    price: expect.any(Number),
                    image: expect.any(String),
                    description: expect.any(String),
                    name: expect.any(String),
                    id: expect.any(String),
                }),
            ])
        );
    });

    test('GET /products - Should not be able to list all products without authentication', async () => {
        const response = await request(app).get('/products');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('GET /products/:id - Must be able to list one product', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const product = await request(app)
            .get('/products')
            .set('Authorization', token);
        const response = await request(app)
            .get(`/products/${product.body[0].id}`)
            .set('Authorization', token);

        expect(response.status).toBe(200);
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
                id: expect.any(String),
            })
        );
    });

    test('GET /products/:id - Should not be able to list one product without authentication', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const product = await request(app)
            .get('/products')
            .set('Authorization', token);
        const response = await request(app).get(
            `/products/${product.body[0].id}`
        );

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('GET /products/users/:id - Must be able to list all products by user', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const user = await request(app)
            .get('/users')
            .set('Authorization', token);
        const response = await request(app)
            .get(`/products/users/${user.body[0].id}`)
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    isActive: expect.any(Boolean),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    quantity: expect.any(Number),
                    price: expect.any(Number),
                    image: expect.any(String),
                    description: expect.any(String),
                    name: expect.any(String),
                    id: expect.any(String),
                }),
            ])
        );
    });

    test('GET /products/users/:id - Must not be able to list all products by user without authentication', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const user = await request(app)
            .get('/users')
            .set('Authorization', token);
        const response = await request(app).get(
            `/products/users/${user.body[0].id}`
        );

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('PATCH - /products/:id - Should be able to update a product', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;
        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);

        const productTobeUpdateRequest = await request(app)
            .get('/products')
            .set('Authorization', token);
        const productTobeUpdateId = productTobeUpdateRequest.body[0].id;

        const response = await request(app)
            .patch(`/products/${productTobeUpdateId}`)
            .set('Authorization', token)
            .send(updatedProductValues);

        const productUpdated = await request(app)
            .get('/products')
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(productUpdated.body[0].name).toEqual('Carrinho Infantil');
        expect(productUpdated.body[0].price).toEqual(207.5);
    });

    test('PATCH - /products/:id - Should not be able to update a product without authentication', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;
        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);

        const productTobeUpdateRequest = await request(app)
            .get('/products')
            .set('Authorization', token);
        const response = await request(app)
            .patch(`/products/${productTobeUpdateRequest.body[0].id}`)
            .send(updatedProductValues);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('PATCH - /products/:id - Should not be able to update a product with invalid id', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        const response = await request(app)
            .patch('/products/1bde224f-5ad7-48c3-3d27-8e383591baaa')
            .set('Authorization', token)
            .send(updatedProductValues);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('DELETE /products/:id -  Must be able to soft delete product', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const productTobeDeletedRequest = await request(app)
            .get('/products')
            .set('Authorization', token);

        const response = await request(app)
            .delete(`/products/${productTobeDeletedRequest.body[0].id}`)
            .set('Authorization', token);

        expect(response.status).toBe(204);
    });

    test('DELETE /products/:id -  Must not be able to soft delete product without authentication', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        await request(app)
            .post('/products')
            .set('Authorization', token)
            .send(mockedProductRequest);
        const productTobeDeletedRequest = await request(app)
            .get('/products')
            .set('Authorization', token);

        const response = await request(app).delete(
            `/products/${productTobeDeletedRequest.body[0].id}`
        );

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('DELETE /products/:id -  Must not be able to soft delete product with invalid id', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;

        const response = await request(app)
            .delete('/products/1bde224f-5ad7-48c3-3d27-8e383591baaa')
            .set('Authorization', token);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });
});
