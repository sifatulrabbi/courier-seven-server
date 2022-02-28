import supertest from 'supertest';
import { app } from '../src/api/app';
import { connectDb } from '../src/lib';
import mongoose from 'mongoose';

describe('users', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('get users route', () => {
    describe('given the users does not exist', () => {
      it('should return 401', async () => {
        const userId = 'sample userId';

        await supertest(app).get(`/api/v1/users/${userId}`).expect(401);
      });
    });
  });
});
