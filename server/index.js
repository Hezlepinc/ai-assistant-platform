// server/index.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// ✅ Config imports
import { connectToMongo } from './ai-architect-core/config/db.js';
import redisClient from './ai-architect-core/config/redisClient.js';
import pineconeClient from './ai-architect-core/config/pineconeClient.js';

import redisTestRouter from './routes/redisTestRouter.js';
import assistantApiRouter from './routes/assistantApiRouter.js';
import devNoteRouter from './routes/devNoteRouter.js';
import chatRouter from './routes/chatRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import chatSessionRouter from './routes/chatSessionRouter.js';
import projectExplorerRouter from './routes/projectExplorerRouter.js';
import fileManagerRouter from './routes/fileManagerRouter.js';
import quickActionRouter from './routes/quickActionRouter.js';
import projectInsightRouter from './routes/projectInsightRouter.js';
import fileRouter from './routes/fileRouter.js';
import inchargeRouter from './routes/inchargeRouter.js'; // ✅ For Incharge Assistant

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Apply middleware
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/api/health', async (req, res) => {
  try {
    let redisStatus = 'skipped';
    if (redisClient?.ping) {
      redisStatus = await redisClient.ping();
    }
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
app.use('/api', chatRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/sessions', chatSessionRouter);
app.use('/api/projects', projectExplorerRouter);
app.use('/api', fileManagerRouter);
app.use('/api/quick-action', quickActionRouter);
app.use('/api/project-insights', projectInsightRouter);
app.use('/api/files', fileRouter);
app.use('/api/incharge', inchargeRouter);

console.log('✅ Routers mounted: /api/assistant, /api/dev-notes, /api/chat, /api/feedback, /api/sessions, /api/incharge');

app.listen(PORT, async () => {
  // 🌐 Determine Mongo URI based on environment
  const mongoUri =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;

  try {
    if (mongoUri) {
      await connectToMongo(mongoUri);
      console.log(`✅ Connected to MongoDB: ${mongoUri}`);
    } else {
      console.warn('⚠️ Skipping Mongo connection — MONGO_URI is not defined');
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }

  try {
    await pineconeClient.describeIndexStats();
    console.log('✅ Connected to Pinecone vector index');
  } catch (err) {
    console.warn('⚠️ Pinecone connection skipped or failed:', err.message);
  }

  console.log(`🚀 AI Assistant Platform server running on port ${PORT}`);
});