import type { Application } from 'express';
import morgan from 'morgan';
import { runOnDevMode } from './run-on-dev-mode';

export function showLogs(app: Application) {
    runOnDevMode(() => {
        app.use(morgan('dev'));
    });
}
