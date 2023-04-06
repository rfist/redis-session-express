import dotenv from 'dotenv';

import * as http from 'http';
import database from './repositories/database';
import { logger } from './utils/logger';
import { setupServer } from './server/server';
import { redisClient } from './repositories/redis';

dotenv.config();

async function bootstrap(): Promise<http.Server> {
  const app = setupServer();

  await redisClient.connect();
  await database();
  const port = process.env.PORT;

  const server = http.createServer(app);
  server.listen(port);
  logger.info(`✅ Server is up and running on port ${process.env.PORT}`);

  return server;
}

bootstrap().catch(logger.error);
