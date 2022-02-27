"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor(res, statusCode, message, data, errors) {
        this.res = res;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            data_count: this.data ? this.data.length : 0,
            data: this.data,
            errors: this.errors,
        });
    }
    static ok(res, message, data = null) {
        new CustomResponse(res, 200, message ? message : 'Ok', data, null);
    }
    static created(res, message, data = null) {
        new CustomResponse(res, 201, message ? message : 'Created', data, null);
    }
    static badRequest(res, message, errors) {
        new CustomResponse(res, 400, message ? message : 'Bad Request', null, errors);
    }
    static notFound(res, message, errors) {
        new CustomResponse(res, 404, message ? message : 'Not Found', null, errors);
    }
    static unauthorized(res, message, errors) {
        new CustomResponse(res, 401, message ? message : 'Unauthorized', null, errors);
    }
    static forbidden(res, message, errors) {
        new CustomResponse(res, 403, message ? message : 'Forbidden', null, errors);
    }
    static internal(res, message, errors) {
        new CustomResponse(res, 500, message ? message : 'Internal Error', null, errors);
    }
}
exports.CustomResponse = CustomResponse;
