import { createClient } from 'redis';

const REDIS_URL = process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL_PROD
  : process.env.REDIS_URL_DEV;

const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (err) => {
  console.error('❌ Redis client error:', err);
});

redisClient.connect()
  .then(() => {
    console.log(`✅ Connected to Redis [${process.env.NODE_ENV}]`);
  })
  .catch((err) => {
    console.error('❌ Redis connection failed:', err);
  });

export default redisClient;