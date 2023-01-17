import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { AppDataSource } from '../../../data-source';
import { app } from '../../../app';
import {
  mockedLoginUser,
  mockedUpdatedBodyUser,
} from '../../mocks/integration/user.mock';

describe('Change the user_data route tests', () => {
  let conn: DataSource;
  const baseUrl: string = '/users/:id';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        conn = res;
        const userRepo = res.getRepository(User);
        for await (const user of mockedUpdatedBodyUser) {
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

  it('Should be able to update user', async () => {
    const newValues = { name: 'Joana Brito', email: 'joanabrito@mail.com' };

    const token = sign(
      { isStore: true || false, isActive: true },
      process.env.SECRET_KEY,
      {
        subject: '1',
      }
    );

    const userOwnerResponse = await request(app)
      .post('/login')
      .set('Authorization', `Bearer ${token}`)
      .send(mockedLoginUser);

    const userTobeUpdateRequest = await request(app)
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .send();

    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`${baseUrl}/${userTobeUpdateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newValues);

    expect(response.status).toBe(200);
    expect(response.body[0].name).toEqual('JoJo');
    expect(response.body[0]).toHaveProperty('password');
  });
});
