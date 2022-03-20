import { config } from './config';
import console from 'console';
import process from 'process';

if (!config.SMTP_EMAIL || !config.SMTP_PASSWORD) {
    console.error('SMTP email and SMTP password required');
    process.exit(1);
}

export const transportConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.SMTP_EMAIL,
        pass: config.SMTP_PASSWORD,
    },
};
