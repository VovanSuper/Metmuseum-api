import Redis, { RedisOptions, Redis as IRedisClient } from 'ioredis';
import { defaultConfig, parseStringToModel } from '../utils/helpers';
import logger from '../utils/logger';

const { REDIS_PASS, REDIS_PORT } = defaultConfig;

const redisOpts: RedisOptions = {
  // host: REDIS_NET_NAME,
  port: parseInt(REDIS_PORT),
  password: REDIS_PASS,
};

export default new (class {
  client: IRedisClient | undefined;

  constructor() {
    this.client = new Redis({ ...redisOpts });
  }

  disconnect() {
    try {
      return this.client?.discard(() => logger.l(`Disconnected from Cache Store...`));
    } catch (error) {
      if (error instanceof Error) logger.err(error.message || error);
      throw error;
    }
  }

  async find<T>(key: string): Promise<T | undefined> {
    try {
      if (!this.client) throw Error('Redis Client not set ..!');
      const objString = await this.client.get(key);
      const objectData: T | null = parseStringToModel(objString);
      if (!objectData) throw new Error(`Object for key ${key} not found in cache..`);
      return objectData;
    } catch (e: unknown) {
      if (e instanceof Error) logger.w(e.message);
    }
  }

  async set<T>(key: string, value: T) {
    try {
      if (!this.client) throw Error('Redis Client not set ..!');
      const setResult = await this.client.set(key, JSON.stringify(value));
      if (!setResult || setResult !== 'OK') throw new Error(`Could not set value for key ${key} to store ..!`);

      return setResult;
    } catch (e: unknown) {
      if (e instanceof Error) logger.w(e.message);
    }
  }
})();
