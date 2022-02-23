import { Response } from "express";

export class CustomResponse {
  constructor(
    private res: Response,
    private statusCode: number,
    private message: string,
    private data: any[] | null,
    private errors: any
  ) {
    this.res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      data_count: this.data ? this.data.length : 0,
      data: this.data,
      errors: this.errors,
    });
  }

  static ok(res: Response, message: string | false, data: any[] | null = null) {
    new CustomResponse(res, 200, message ? message : "Ok", data, null);
  }

  static created(
    res: Response,
    message: string | false,
    data: any[] | null = null
  ) {
    new CustomResponse(res, 201, message ? message : "Created", data, null);
  }

  static badRequest(res: Response, message: string | false, errors: any) {
    new CustomResponse(
      res,
      400,
      message ? message : "Bad Request",
      null,
      errors
    );
  }

  static notFound(res: Response, message: string | false, errors: any) {
    new CustomResponse(res, 404, message ? message : "No Found", null, errors);
  }

  static unauthorized(res: Response, message: string | false, errors: any) {
    new CustomResponse(
      res,
      401,
      message ? message : "Unauthorized",
      null,
      errors
    );
  }

  static forbidden(res: Response, message: string | false, errors: any) {
    new CustomResponse(res, 403, message ? message : "Forbidden", null, errors);
  }

  static internal(res: Response, message: string | false, errors: any) {
    new CustomResponse(
      res,
      500,
      message ? message : "Internal Error",
      null,
      errors
    );
  }
}
