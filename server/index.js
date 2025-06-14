import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { connectToMongo } from './config/db.js';
import redisClient from './config/redisClient.js';

import redisTestRouter from './routes/redisTestRouter.js';
import assistantApiRouter from './routes/assistantApiRouter.js';
import devNoteRouter from './routes/devNoteRouter.js';
import chatRouter from './routes/chatRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/api/health', async (req, res) => {
  try {
    const redisStatus = await redisClient.ping();
    res.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      redis: redisStatus,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: err.message,
    });
  }
});

// ✅ Mount routers
app.use('/api/redis', redisTestRouter);
app.use('/api/assistant', assistantApiRouter);
app.use('/api/dev-notes', devNoteRouter);
app.use('/api', chatRouter); // POST /api/chat calls orchestrator
app.use('/api/feedback', feedbackRouter);

console.log('✅ Routers mounted: /api/assistant, /api/dev-notes, /api/chat, /api/feedback');

app.listen(PORT, async () => {
  await connectToMongo();
  console.log(`🚀 AI Assistant Platform server running on port ${PORT}`);
});