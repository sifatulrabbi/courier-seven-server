import { NextFunction, Request, Response } from 'express';

export function setHeaders(req: Request, res: Response, next: NextFunction) {
  res.header('Content-Type', 'application/json');
  res.header('Accept', 'application/json');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
}
