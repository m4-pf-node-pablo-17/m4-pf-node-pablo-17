import request from 'supertest';
import { DataSource } from 'typeorm';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { Comment } from '../../../entities/comment.entity';
import {
    mockedCommentRequest,
    mockedLoginCommentUser,
} from '../../mocks/integration/comments.mocks';
import { mockedPost1 } from '../../mocks/integration/posts.mock';
import { mockedCreateUser } from '../../mocks/integration/user.mock';
describe('/message', () => {
    let connection: DataSource;
    const messageRepository = AppDataSource.getRepository(Comment);

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error('Error while initializing with DB', err);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /message/:id - Should be able to create a message', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginCommentUser);

        const token = `Bearer ${userLoginResponse.body.tokenUser}`;
        const post = await request(app)
            .post('/posts')
            .set('Authorization', token)
            .send(mockedPost1);

        const response = await request(app)
            .post(`/message/${post.body.id}`)
            .set('Authorization', token)
            .send(mockedCommentRequest);

        expect(response.body.post).toHaveProperty('id');
        expect(response.body.post).toHaveProperty('image');
        expect(response.body.post).toHaveProperty('title');
        expect(response.body.post).toHaveProperty('text');
        expect(response.body.post).toHaveProperty('createdAt');
        expect(response.body.post).toHaveProperty('updatedAt');
        expect(response.body.post).toHaveProperty('deletedAt');

        expect(response.body.comments).toHaveProperty('id');
        expect(response.body.comments).toHaveProperty('text');
        expect(response.body.comments).toHaveProperty('createdAt');
        expect(response.body.comments).toHaveProperty('updatedAt');
        expect(response.body.comments).toHaveProperty('deletedAt');

        expect(response.body.comments.user).toHaveProperty('id');
        expect(response.body.comments.user).toHaveProperty('image');
        expect(response.body.comments.user).toHaveProperty('name');
        expect(response.body.comments.user).toHaveProperty('email');
        expect(response.body.comments.user).toHaveProperty('password');
        expect(response.body.comments.user).toHaveProperty('contact');
        expect(response.body.comments.user).toHaveProperty('register');
        expect(response.body.comments.user).toHaveProperty('isStore');
        expect(response.body.comments.user).toHaveProperty('isActive');
        expect(response.body.comments.user).toHaveProperty('createdAt');
        expect(response.body.comments.user).toHaveProperty('updatedAt');
        expect(response.body.comments.user).toHaveProperty('deletedAt');

        expect(response.body).toHaveProperty('id');

        expect(response.status).toBe(201);
    });

    test('GET /message/:id/posts -  Must be able to list all messages from post', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const loginResponse = await request(app)
            .post('/login')
            .send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`;
        const post = await request(app)
            .post('/posts')
            .set('Authorization', token)
            .send(mockedPost1);
        await request(app)
            .post(`/message/${post.body.id}`)
            .set('Authorization', token)
            .send(mockedCommentRequest);
        const getComment = await request(app)
            .get(`/message/${post.body.id}/posts`)
            .set('Authorization', token);
        expect(getComment.status).toBe(200);
        expect(getComment.body[0]).toHaveProperty('comments_id');
        expect(getComment.body[0]).toHaveProperty('comments_text');
        expect(getComment.body[0]).toHaveProperty('comments_createdAt');
        expect(getComment.body[0]).toHaveProperty('comments_updatedAt');
        expect(getComment.body[0]).toHaveProperty('comments_deletedAt');
        expect(getComment.body[0]).toHaveProperty('comments_userId');
        expect(getComment.body[0]).toHaveProperty('id_post');
    });

    test('GET /message/:id/posts -  Should not be able to list the messages of a post without authentication', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const loginResponse = await request(app)
            .post('/login')
            .send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`;
        await request(app)
            .post('/posts')
            .set('Authorization', token)
            .send(mockedPost1);
        const post = await request(app).get('/posts');
        const response = await request(app).get(
            `/message/${post.body.id}/posts`
        );
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(401);
    });

    test('GET /message/:id/posts -  Should not be able to list the messages of a post with invalid id', async () => {
        const user = await request(app).post('/users').send(mockedCreateUser);
        const loginResponse = await request(app)
            .post('/login')
            .send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`;
        await request(app)
            .post('/posts')
            .set('Authorization', token)
            .send(mockedPost1);
        await request(app).get('/posts').set('Authorization', token);
        const response = await request(app)
            .get(`/message/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4/posts`)
            .set('Authorization', token);

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(404);
    });

    test('DELETE /message/:id -  Must be able to delete message', async () => {
        await request(app).post('/users').send(mockedCreateUser);
        const userLoginResponse = await request(app)
            .post('/login')
            .send(mockedLoginCommentUser);

        const token = `Bearer ${userLoginResponse.body.tokenUser}`;
        const post = await request(app)
            .post('/posts')
            .set('Authorization', token)
            .send(mockedPost1);

        await request(app)
            .post(`/message/${post.body.id}`)
            .set('Authorization', token)
            .send(mockedCommentRequest);
        const messageTobeDeletedRequest = await request(app)
            .get(`/message/${post.body.id}/posts`)
            .set('Authorization', token);

        const response = await request(app)
            .delete(`/message/${messageTobeDeletedRequest.body[0].comments_id}`)
            .set('Authorization', token);

        expect(response.status).toBe(204);
    });
});

