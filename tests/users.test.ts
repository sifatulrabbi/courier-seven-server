import { connectDb } from '../src/lib';
import mongoose from 'mongoose';
import { usersController } from '../src/api/controllers';

describe('users', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('get user by id', () => {
    const mockReq: any = {
      // params: {
      //   id: 'test-user-001',
      // },
      // user: {
      //   _id: 'test-user-001',
      //   mobile: '+8801234567890',
      //   email: 'testuser.001@email.com',
      // },
    };
    const mockRes: any = {
      json: jest.fn(),
      status: jest.fn(),
    };
    // const mockNext: NextFunction = jest.fn();

    usersController.getAll(mockReq, mockRes);
    expect(mockRes.status).toBe(200);
  });
});
