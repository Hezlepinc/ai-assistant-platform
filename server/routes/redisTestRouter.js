import express from 'express';
import redisClient from '../config/redisClient.js';

const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    await redisClient.set('redis:test:key', 'It works!', { EX: 60 });
    const value = await redisClient.get('redis:test:key');

    res.json({
      status: 'success',
      message: 'Connected to Redis and read value successfully',
      value,
    });
  } catch (err) {
    console.error('Redis test failed:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;