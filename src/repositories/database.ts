import mongoose from 'mongoose';
import { logger } from '../utils/logger';

async function database(): Promise<void> {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `${process.env.DATABASE_URL_DEV}/${process.env.DATABASE}` as string
    );
    logger.info('Database connected.');
  } catch (error: any) {
    logger.error('Database connection failded.', error);
  }
}

export default database;
