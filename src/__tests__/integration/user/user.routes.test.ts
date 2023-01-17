import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import request from 'supertest';
import { app } from '../../../app';
import {
  mockedLoginUser,
  mockedUser,
  mockedUserReponse,
} from '../../mocks/integration/user.mock';

describe('/users', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('GET /users -  Must be able to list users', async () => {
    await request(app).post('/users').send(mockedUser);

    const loginResponse = await request(app)
      .post('/login')
      .send(mockedLoginUser);

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${loginResponse.body.tokenUser}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty('password');
  });

  test('GET /users -  should not be able to list users without authentication', async () => {
    const response = await request(app).get('/users');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /users/:id - testing the return of a user', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send(mockedLoginUser);
    const token = `Bearer ${loginResponse.body.tokenUser}`;

    const userReturned = await request(app)
      .get('/users')
      .set('Authorization', token);
    const userIdReturned = userReturned.body[0].id;

    const response = await request(app)
      .get(`/users/${userIdReturned}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.name).toContain('Sakura Kinomoto');
  });

  test('PATCH /users/:id -  should not be able to update user without authentication', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send(mockedLoginUser);

    const userTobeUpdate = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${loginResponse.body.tokenUser}`);
    const response = await request(app).patch(
      `/users/${userTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - should not be able to update user with invalid id', async () => {
    const newValues = {
      name: 'Lisa Simpson',
      email: 'simpson.lisa@mail.com',
    };

    const loginResponse = await request(app)
      .post('/login')
      .send(mockedLoginUser);
    const token = `Bearer ${loginResponse.body.tokenUser}`;

    const response = await request(app)
      .patch(`/users/4880837b-fbd0-4815-8528-833412cc9ee2`)
      .set('Authorization', token)
      .send(newValues);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /users/:id - should not be able to update isActive field value', async () => {
    const newValues = { isActive: false };

    const loginResponse = await request(app)
      .post('/login')
      .send(mockedLoginUser);
    const token = `Bearer ${loginResponse.body.tokenUser}`;

    const userTobeUpdateRequest = await request(app)
      .get('/users')
      .set('Authorization', token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .set('Authorization', token)
      .send(newValues);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
