const { 
  REDIS_HOST,
  REDIS_PASSWORD 
} = process.env;

const redisConfig = {
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
};

export default redisConfig;