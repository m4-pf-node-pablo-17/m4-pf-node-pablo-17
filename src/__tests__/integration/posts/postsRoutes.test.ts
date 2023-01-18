import request from 'supertest';
import { DataSource } from 'typeorm';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { mockedLoginCommentUser } from '../../mocks/integration/comments.mocks';

import {
    mockedPost1,
    mockedPost2,
    mockedPost3,
} from '../../mocks/integration/posts.mock';
import { mockedCreateUser, mockedLoginUser } from '../../mocks/integration/user.mock';

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
        await request(app).post("/users").send(mockedCreateUser)
        const loginResponse = await request(app).post("/login").send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        const post = await request(app).post("/posts").set('Authorization', token).send(mockedPost1)
        

        console.log(post.body);
        
        /* const posts = await request(app).get('/posts');
        const adminLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginUser);
        mockedPost1.id = posts.body[0].id;
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedPost1); */

        expect(post.body).toHaveProperty('title');
        expect(post.body).toHaveProperty('text');
        expect(post.body).toHaveProperty('image');
        expect(post.body).toHaveProperty('deletedAt');
        expect(post.body).toHaveProperty('id');
        expect(post.body).toHaveProperty('createdAt');
        expect(post.body).toHaveProperty('updatedAt');
        expect(post.body.user).toHaveProperty('id');
        expect(post.body.user).toHaveProperty('image');
        expect(post.body.user).toHaveProperty('name');
        expect(post.body.user).toHaveProperty('email');
        expect(post.body.user).toHaveProperty('contact');
        expect(post.body.user).toHaveProperty('register');
        expect(post.body.user).toHaveProperty('isStore');
        expect(post.body.user).toHaveProperty('isActive');
        expect(post.body.user).toHaveProperty('createdAt');
        expect(post.body.user).toHaveProperty('updatedAt');
        expect(post.status).toBe(201);
    });

    test('POST /posts -  should not be able to create post with same id', async () => {
        const adminLoginResponse = await request(app)
            .post('/login')
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
        const post = await request(app).get('/posts/:id');
        const response = await request(app).get(
            `/posts/${post.body[0].id}`
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

    // test('GET /posts/:id -  Should not be able to list properties of a category with invalid id', async () => {
    //     const response = await request(app).get(
    //         `/posts/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`
    //     );
    //     expect(response.body).toHaveProperty('message');
    //     expect(response.status).toBe(404);
    // });
});
