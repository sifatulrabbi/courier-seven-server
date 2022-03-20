import mongoose from 'mongoose';
import { config } from '../configs/config';
import { runOnDevMode } from './run-on-dev-mode';

export async function connectDb() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        runOnDevMode(() => {
            console.log('Connected to MongoDB');
        });
    } catch (err) {
        console.error('unable to connect to the MongoDB', err);
        process.exit(1);
    }
}
