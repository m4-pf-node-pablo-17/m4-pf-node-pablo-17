import request from 'supertest';
import { DataSource } from 'typeorm';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import {
    mockedRouterLogin,
    mockedRouterLoginincorrect,
    mockedRouterLoginUser,
} from '../../mocks/integration/login.mock';

describe('/login', () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error('Error during startup', err);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /login - able to log in', async () => {
        await request(app).post('/users').send(mockedRouterLoginUser);
        const login = await request(app).post('/login').send(mockedRouterLogin);

        expect(login.body).toHaveProperty('tokenUser');
        expect(login.status).toBe(200);
    });

    test('POST /login - unable to login with wrong user', async () => {
        const login = await request(app)
            .post('/login')
            .send(mockedRouterLoginincorrect);

        expect(login.body).toHaveProperty('message');
        expect(login.status).toBe(403);
    });

    test('POST /login -  should not be able to login with the user with isActive = false', async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send(mockedRouterLogin);

        const findUser = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${loginResponse.body.tokenUser}`);

        await request(app)
            .delete(`/users/${findUser.body[0].id}`)
            .set('Authorization', `Bearer ${loginResponse.body.tokenUser}`);

        const response = await request(app)
            .post('/login')
            .send(mockedRouterLogin);

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400);
    });
});
