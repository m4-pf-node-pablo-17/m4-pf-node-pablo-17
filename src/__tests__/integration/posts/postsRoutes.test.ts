import request from 'supertest';
import { DataSource } from 'typeorm';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';

import {
    mockedPost1,
    mockedPost2,
    mockedPost3,
} from '../../mocks/integration/posts.mock';
import { mockedLoginUser } from '../../mocks/integration/user.mock';

describe('/posts', () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error('Error during Data Source initialization', err);
            });

        await request(app).post('/posts').send(mockedLoginUser);
        await request(app).post('/posts').send(mockedPost1);
        await request(app).post('/posts').send(mockedPost2);
        await request(app).post('/posts').send(mockedPost3);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /posts -  Must be able to create a post', async () => {
        const posts = await request(app).get('/posts');
        const adminLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginUser);
        mockedPost1.id = posts.body[0].id;
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedPost1);

        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('text');
        expect(response.body).toHaveProperty('image');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('image');
        expect(response.body.user).toHaveProperty('name');
        expect(response.body.user).toHaveProperty('email');
        expect(response.body.user).toHaveProperty('contact');
        expect(response.body.user).toHaveProperty('register');
        expect(response.body.user).toHaveProperty('isStore');
        expect(response.body.user).toHaveProperty('isActive');
        expect(response.body.user).toHaveProperty('createdAt');
        expect(response.body.user).toHaveProperty('updatedAt');
        expect(response.status).toBe(201);
    });

    test('POST /posts -  should not be able to create post with same id', async () => {
        const adminLoginResponse = await request(app)
            .post('/posts')
            .send(mockedLoginUser);
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedPost1);

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(409);
    });

    test('POST /posts -  should not be able to create post without authentication', async () => {
        const response = await request(app).post('/posts').send(mockedPost2);

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(401);
    });

    // test('POST /posts - should not be able to create category not being admin', async () => {
    //     const userLoginResponse = await request(app)
    //         .post('/login')
    //         .send(mockedLoginUser);
    //     const response = await request(app)
    //         .post('/posts')
    //         .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
    //         .send(mockedPost1);

    //     expect(response.body).toHaveProperty('message');
    //     expect(response.status).toBe(403);
    // });

    test('GET /posts -  Must be able to list all posts', async () => {
        const response = await request(app).get('/posts');
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    test('GET /posts/:id -  Must be able to list one post only', async () => {
        const category = await request(app).get('/posts');
        const response = await request(app).get(
            `/posts/${category.body[0].id}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('image');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('text');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body).toHaveProperty('deletedAt');
    });

    test('GET /posts/:id/properties -  Should not be able to list properties of a category with invalid id', async () => {
        const response = await request(app).get(
            `/posts/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`
        );
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(404);
    });
});
