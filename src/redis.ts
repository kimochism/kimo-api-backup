import * as Redis from 'ioredis';
import redisConfig from './config/redis.config';

export const redis = new Redis({
  port: 11041,
  host: redisConfig.host,
  family: 4,
  password: redisConfig.password,
  db: 0,
});