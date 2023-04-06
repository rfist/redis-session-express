import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';
import { UserSession } from '../types/userSession';

class RedisClient {
  public client!: RedisClientType;

  async get(key: string): Promise<UserSession | null> {
    const json = await this.client.get(key);
    if (json) {
      try {
        return JSON.parse(json) as UserSession;
      } catch (error) {
        logger.error(error);
      }
    }
    return null;
  }

  async set(key: string, value: any, options?: any) {
    return this.client.set(key, value, options);
  }

  async connect() {
    const url = process.env.REDIS_URL;
    this.client = createClient({ url });
    await this.client.connect();
    this.client.on('error', (err: Error) => {
      logger.error('Redis error:', err);
    });
  }
}

const redisClient = new RedisClient();
export { redisClient };
