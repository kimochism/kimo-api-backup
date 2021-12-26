import * as Redis from 'ioredis';

export const redis = new Redis({
  port: 11041, // Redis port
  host: 'redis-11041.c60.us-west-1-2.ec2.cloud.redislabs.com', // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: 'gAHcNl68uOG2rmJBdnPJDnXM445lKh0k',
  db: 0,
});