import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import request from 'supertest';
import { app } from '../../../app';
import { mockedComment, mockedCommentRequest, mockedListComments, mockedLoginCommentUser } from '../../mocks/integration/comments.mocks';
import { mockedCreateUser, mockedLoginUser } from '../../mocks/integration/user.mock';
import { mockedLoginProductUser } from '../../mocks/integration/products.mock';
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

    beforeEach(async () => {
        const usersDB = await messageRepository.find();
        await messageRepository.remove(usersDB);
    });


    afterAll(async () => {
        await connection.destroy();
    });

    test('GET /message/:id/posts -  Must be able to list all messages from post', async () => {
        await request(app).post("/users").send(mockedCreateUser)
        const loginResponse = await request(app).post("/login").send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        const post = await request(app).post("/posts").set('Authorization', token).send(mockedPost1)
        await request(app).post(`/message/${post.body.id}`).set('Authorization', token).send(mockedCommentRequest)


        const commentget = await request(app).get(`/message/${post.body.id}/posts`).set('Authorization', token)

        expect(commentget.status).toBe(200);
        expect(commentget.body[0]).toHaveProperty('comments_id');
        expect(commentget.body[0]).toHaveProperty('comments_text');
        expect(commentget.body[0]).toHaveProperty('comments_createdAt');
        expect(commentget.body[0]).toHaveProperty('comments_updatedAt');
        expect(commentget.body[0]).toHaveProperty('comments_deletedAt');
        expect(commentget.body[0]).toHaveProperty('comments_userId');
        expect(commentget.body[0]).toHaveProperty('id_post');
    });

    test("GET /message/:id/posts -  should not be able to list the messages of a post with invalid id",async () => {
       /*  await request(app).post("/users").send(mockedCreateUser)
        const loginResponse = await request(app).post("/login").send(mockedLoginCommentUser);
        const token = `Bearer ${loginResponse.body.tokenUser}`
        const post = await request(app).post("/posts").set('Authorization', token).send(mockedPost1)
        await request(app).post(`/message/${post.body.id}`).set('Authorization', token).send(mockedCommentRequest)
 */
       


        
        const loginResponse = await request(app).post("/login").send(mockedLoginCommentUser);
        const response = await request(app).get(`/message/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4/posts`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("GET /message/:id/posts -  should not be able to list the messages of a post without authentication",async () => {
        const post = await request(app).get('/posts')
        const response = await request(app).get(`/message/${post.body[0].id}/posts`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
});
