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

        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginProductUser);
        const token = `Bearer ${userLoginResponse.body.tokenUser}`;
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

    test('POST /products - Should not be able to create product | invalid body', async () => {
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

    test('PATCH /products/:id - Should be able to update a product', async () => {
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
});
