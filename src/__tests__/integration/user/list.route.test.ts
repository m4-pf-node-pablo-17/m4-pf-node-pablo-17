import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { AppDataSource } from '../../../data-source';
import { mockedListUsers } from '../../mocks/integration/user.mock';
import { app } from '../../../app';

describe('List user route tests', () => {
  let conn: DataSource;
  const baseUrl: string = '/users';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        conn = res;
        const userRepo = res.getRepository(User);
        for await (const user of mockedListUsers) {
          const mockedUser = userRepo.create({
            ...user,
            password: 'testing',
          });
          await userRepo.save(mockedUser);
        }
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('Should be able to list users', async () => {
    const token = sign(
      { isStore: true || false, isActive: true },
      process.env.SECRET_KEY,
      {
        subject: '1',
      }
    );

    const response = await request(app)
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToHaveLength: mockedListUsers.length,
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toHaveLength(expectedResponse.bodyToHaveLength);
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ])
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String) }),
      ])
    );
  });

  it('Should be not able to list users | missing token', async () => {
    const response = await request(app).get(baseUrl).send();

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: 'Invalid token' },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  it('Must be able to list a user', async () => {
    const token = sign(
      { isStore: true || false, isActive: true },
      process.env.SECRET_KEY,
      {
        subject: '1',
      }
    );

    const response = await request(app)
      .get(`${baseUrl}/:id`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToHaveLength: response.body[0].id,
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toHaveLength(expectedResponse.bodyToHaveLength);
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ])
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String) }),
      ])
    );
  });
});
