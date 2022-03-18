import request from 'supertest';
import { prepare, server } from '../../../src/server';

beforeAll((done) => {
  prepare();
  done();
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe('Tests form authRouter /api/v1/auth', () => {
  it('should return 401 if GET /login', (done) => {
    request(server).get('/api/v1/auth/login').expect(401, done);
  });

  // describe('login with email and password', () => {
  //   it('should return 404 for unregistered user', (done) => {
  //     request(server)
  //       .post('/api/v1/auth/login')
  //       .set('Content-type', 'application/json')
  //       .send({
  //         email: 'example@email.com',
  //         password: 'password',
  //       })
  //       .expect(400, done);
  //   });
  // });

  describe('registering user', () => {
    describe('register step 1', () => {
      const url = '/api/v1/auth/register';
      it('should respond with 400 if no email is given', (done) => {
        request(server).post(url).send({ email: '' }).expect(400, done);
      });

      it('should respond with 200 if email is given', (done) => {
        request(server)
          .post(url)
          .send({ email: 'example@email.com' })
          .expect(200, done);
      });

      it('should send a token and opt if email is given', (done) => {
        request(server)
          .post(url)
          .send({ email: 'example@email.com' })
          .end((err, res) => {
            if (err) {
              done(new Error(err.message));
              return;
            }
            const data = res.body.data[0];
            if (data.token && data.verification_key) {
              done();
            } else done(data);
          });
      });
    });
  });
});
