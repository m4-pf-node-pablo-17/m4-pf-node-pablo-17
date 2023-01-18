import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import request from 'supertest';
import { app } from '../../../app';
import { mockedCommentRequest, mockedLoginCommentUser } from '../../mocks/integration/comments.mocks';
import { mockedCreateUser } from '../../mocks/integration/user.mock';
import { mockedPost1 } from '../../mocks/integration/posts.mock';
import { Comment } from '../../../entities/comment.entity';
describe('/message', () => {

    let connection: DataSource;
    const messageRepository = AppDataSource.getRepository(Comment)

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

    test('GET /message/:id/posts -  Must be able to list all messages from post', async () => {
        await request(app).post('/users').send(mockedCreateUser)
        const loginResponse = await request(app).post('/login').send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        const post = await request(app).post('/posts').set('Authorization', token).send(mockedPost1)
        await request(app).post(`/message/${post.body.id}`).set('Authorization', token).send(mockedCommentRequest)
        const getComment = await request(app).get(`/message/${post.body.id}/posts`).set('Authorization', token)
        expect(getComment.status).toBe(200);
        expect(getComment.body[0]).toHaveProperty('comments_id');
        expect(getComment.body[0]).toHaveProperty('comments_text');
        expect(getComment.body[0]).toHaveProperty('comments_createdAt');
        expect(getComment.body[0]).toHaveProperty('comments_updatedAt');
        expect(getComment.body[0]).toHaveProperty('comments_deletedAt');
        expect(getComment.body[0]).toHaveProperty('comments_userId');
        expect(getComment.body[0]).toHaveProperty('id_post');
    });

    
    
    test('GET /message/:id/posts -  Should not be able to list the messages of a post without authentication',async () => {
        await request(app).post('/users').send(mockedCreateUser)
        const loginResponse = await request(app).post('/login').send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        await request(app).post('/posts').set('Authorization', token).send(mockedPost1)
        const post = await request(app).get('/posts')
        const response = await request(app).get(`/message/${post.body.id}/posts`)
        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
    })

    test('GET /message/:id/posts -  Should not be able to list the messages of a post with invalid id',async () => {
        const user = await request(app).post('/users').send(mockedCreateUser)
        const loginResponse = await request(app).post('/login').send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        await request(app).post('/posts').set('Authorization', token).send(mockedPost1)
        await request(app).get('/posts').set('Authorization', token)
        const response = await request(app).get(`/message/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4/posts`).set('Authorization', token)
        
        
        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(404)
    })
});