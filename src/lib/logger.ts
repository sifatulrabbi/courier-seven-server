import type { Application } from 'express';
import morgan from 'morgan';
import { config } from '../configs/config';

export function showLogs(app: Application) {
  if (!config.PROD) {
    app.use(morgan('dev'));
  }
}
