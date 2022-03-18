import { Server } from 'http';
import request from 'supertest';
import { app } from '../src/api/app';
import { connectDb } from '../src/lib/connect-db';

let testApp: Server;

/**
 * Prepare server
 */
beforeAll((done) => {
  testApp = app.listen(8888);
  connectDb();
  done();
});

/**
 * Clean up server
 */
afterAll((done) => {
  testApp.close(() => {
    done();
  });
});

describe('Tests for server', () => {
  it('Should response 404 on GET /api/v1', (done) => {
    request(app).get('/api/v1').expect(404, done);
  });
});

describe('Request in the /api/v1/users', () => {
  it('GET /api/v1/users should return an array', (done) => {
    request(app).get('/api/v1/users').expect(200, done);
  });
});
