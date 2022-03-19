import { usersService } from '../../src/services/users.service';
import { connectDb } from '../../src/lib/connect-db';
import { ICreateUserDto } from '../../src/interfaces/users.interface';

const mockData: ICreateUserDto = {
  name: { first: 'first', last: 'last' },
  account_type: 'diamond',
  email: 'test@test.com',
  password: 'password',
  confirm_password: 'password',
  mobile: '01234567890',
  address: {
    division: 'division',
    district: 'district',
    area: 'area',
    upazila: 'upazila',
    street: 'street',
    house: 'house',
  },
  verification_key: 'key',
  token: '123456',
};

let mockUserId: string;

beforeAll(async () => {
  await connectDb();
});

describe('Users CRUD tests', () => {
  describe('Create user tests', () => {
    describe("given user passwords didn't match", () => {
      it('should fail with "password" and "passwords"', (done) => {
        const data = {
          ...mockData,
          confirm_password: 'passwords',
        };
        usersService.create(data, (err, result) => {
          expect(err).toBeTruthy();
          expect(result).toBeFalsy();
          done();
        });
      });
    });

    describe('given write data', () => {
      mockData.confirm_password = 'password';
      it('should pass and return an user doc', (done) => {
        usersService.create(mockData, (err, result) => {
          expect(err).toBeFalsy();
          expect(result).toBeTruthy();
          // @ts-ignore
          mockUserId = result._id.toString();
          done();
        });
      });
    });
  });

  describe('removing user', () => {
    it('should remove user of the user id', (done) => {
      usersService.remove(mockUserId, (err, result) => {
        expect(err).toBeFalsy();
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
