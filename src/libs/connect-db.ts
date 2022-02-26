import mongoose from 'mongoose';
import { config } from '../configs/config';
import console from 'console';
import process from 'process';

export async function connectDb() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('unable to connect to the MongoDB', err);
    process.exit(1);
  }
}
