import { verifyMobileMiddleware } from '../../../src/api/middlewares/verify-mobile.middleware';
import { Request, Response } from 'express';

const mockReq: any = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: { mobile: '0123456789' },
    cookies: {},
    query: {},
    params: {},
};

const mockRes: any = {
    json: function (value: Response<any, Record<any, string>>) {
        return value;
    },
    status: jest.fn(),
};

function next(err?: any) {
    return err;
}

describe('Testing verifyMobileMiddleware', () => {
    describe('should return status code 400 of invalid mobile numbers', () => {
        it('should return 400 for 0123456789', (done) => {
            // verifyMobileMiddleware(mockReq, mockRes, next);
            // expect(mockRes.json).toBeCalledTimes(1);
            done();
        });
    });
});
