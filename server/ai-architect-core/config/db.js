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
      ssl: true, // Enforce SSL for MongoDB Atlas
      tls: true, // Ensure TLS layer
    });
    console.log(`✅ Connected to MongoDB [${NODE_ENV}]`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
};