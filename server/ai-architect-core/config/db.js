// server/ai-architect-core/config/db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI =
  process.env.MONGO_URI ||
  (NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV);

export const connectToMongo = async () => {
  if (!MONGO_URI || typeof MONGO_URI !== 'string') {
    throw new Error('❌ MONGO_URI is undefined or invalid.');
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB [${NODE_ENV}]`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};