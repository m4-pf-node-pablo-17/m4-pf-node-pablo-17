import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import request from 'supertest';
import { app } from '../../../app';
import { mockedLoginUser, mockedUser } from '../../mocks/integration/user.mock';

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

  // test('POST /users - Must be able to create a user', async () => {
  //   const response = await request(app)
  //     .post(baseUrl)
  //     .send(mockedCreateUserRequest);
  //   const expectedStatus = { status: 201 };
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('image');
  //   expect(response.body).toHaveProperty('name');
  //   expect(response.body).toHaveProperty('email');
  //   expect(response.body).toHaveProperty('isStore');
  //   expect(response.body).toHaveProperty('isActive');
  //   expect(response.body).toHaveProperty('createdAt');
  //   expect(response.body).toHaveProperty('updatedAt');
  //   expect(response.body).not.toHaveProperty('password');
  //   expect(response.body.isActive).toEqual(true);
  //   expect(response.status).toBe(expectedStatus.status);
  //   const [users, amount] = await userRepository.findAndCount();
  //   expect(amount).toBe(1);
  // });
  // test('POST /users - Do not create existing user', async () => {
  //   const response = await request(app)
  //     .post('/users')
  //     .send(mockedCreateUserResponse);
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(409);
  // });
  // test('POST /users - Unable to create user', async () => {
  //   const response = await request(app)
  //     .post(baseUrl)
  //     .send(mockedCreateNotUserRequest);
  //   const expectedResults = {
  //     status: 409,
  //     bodyToEqual: mockedCreateNotUserResponse,
  //   };
  //   expect(response.status).toBe(expectedResults.status);
  //   expect(response.body).not.toEqual(
  //     expect.objectContaining(expectedResults.bodyToEqual)
  //   );
  //   const [users, amount] = await userRepository.findAndCount();
  //   expect(amount).toBe(0);
  // });

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

  // test('DELETE /users/:id - Must be able to soft delete user', async () => {
  //   await request(app).post('/users').send(mockedCreateUserRequest);
  //   const loginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedLoginUser);
  //   const UserDeleted = await request(app)
  //     .get('/users')
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   const response = await request(app)
  //     .delete(`/users/${UserDeleted.body[0].id}`)
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   const findUser = await request(app)
  //     .get('/users')
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   expect(response.status).toBe(204);
  //   expect(findUser.body[0].isActive).toBe(false);
  // });
  // test('DELETE /users/:id - Do not delete without authentication', async () => {
  //   const loginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedLoginUser);
  //   const UserDeleted = await request(app)
  //     .get('/users')
  //     .set('Authorization', `Bearer ${loginResponse.body.tokenUser}`);
  //   const response = await request(app).delete(
  //     `/users/${UserDeleted.body[0].id}`
  //   );
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(401);
  // });
  // test('DELETE /users/:id - Do not delete user with isActive = false', async () => {
  //   await request(app).post('/users').send(mockedCreateUserRequest);
  //   const loginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedLoginUser);
  //   const UserDeleted = await request(app)
  //     .get('/users')
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   const response = await request(app)
  //     .delete(`/users/${UserDeleted.body[0].id}`)
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('message');
  // });
  // test('DELETE /users/:id - Do not delete user with invalid id', async () => {
  //   await request(app).post('/users').send(mockedCreateUserRequest);
  //   const loginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedLoginUser);
  //   const response = await request(app)
  //     .delete(`/users/c6c8c1f3-490d-42ab-a296-72a514bf99e5`)
  //     .set('Authorization', `Bearer ${loginResponse.body.token}`);
  //   expect(response.status).toBe(404);
  //   expect(response.body).toHaveProperty('message');
  // });

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
  //1
  // test('PATCH /users/:id - should not be able to update id field value', async () => {
  //   const newValues = { id: false };

  //   const admingLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedAdminLogin);
  //   const token = `Bearer ${admingLoginResponse.body.token}`;

  //   const userTobeUpdateRequest = await request(app)
  //     .get('/users')
  //     .set('Authorization', token);
  //   const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

  //   const response = await request(app)
  //     .patch(`/users/${userTobeUpdateId}`)
  //     .set('Authorization', token)
  //     .send(newValues);
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(401);
  // });
  //2
  // test('PATCH /users/:id - should not be able to update another user without adm permission', async () => {
  //   const newValues = { isActive: false };

  //   const userLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedUser);
  //   const admingLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedAdminLogin);
  //   const userToken = `Bearer ${userLoginResponse.body.token}`;
  //   const adminToken = `Bearer ${admingLoginResponse.body.token}`;

  //   const userTobeUpdateRequest = await request(app)
  //     .get('/users')
  //     .set('Authorization', adminToken);
  //   const userTobeUpdateId = userTobeUpdateRequest.body[1].id;

  //   const response = await request(app)
  //     .patch(`/users/${userTobeUpdateId}`)
  //     .set('Authorization', userToken)
  //     .send(newValues);

  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(401);
  // });
  //3
  // test('PATCH /users/:id -  should be able to update user', async () => {
  //   const newValues = { name: 'Joana Brito', email: 'joanabrito@mail.com' };

  //   const admingLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedAdminLogin);
  //   const token = `Bearer ${admingLoginResponse.body.token}`;

  //   const userTobeUpdateRequest = await request(app)
  //     .get('/users')
  //     .set('Authorization', token);
  //   const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

  //   const response = await request(app)
  //     .patch(`/users/${userTobeUpdateId}`)
  //     .set('Authorization', token)
  //     .send(newValues);

  //   const userUpdated = await request(app)
  //     .get('/users')
  //     .set('Authorization', token);

  //   expect(response.status).toBe(200);
  //   expect(userUpdated.body[0].name).toEqual('Joana Brito');
  //   expect(userUpdated.body[0]).not.toHaveProperty('password');
  // });
});
