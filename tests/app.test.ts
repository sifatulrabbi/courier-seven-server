import request from 'supertest';
import { app } from '../src/api/app';

beforeAll(async function () {});

describe('It is a fake test', function () {
  it('should respond with and array', function () {
    const result = 2 + 3;
    expect(result).toEqual(5);
  });
});
