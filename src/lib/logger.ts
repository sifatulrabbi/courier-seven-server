import type { Express } from 'express';
import morgan from 'morgan';
import { config } from '../configs/config';

export function showLogs(app: Express) {
  if (!config.PROD) {
    app.use(morgan('dev'));
  }
}
