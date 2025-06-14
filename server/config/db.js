import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ✅ Load environment variables here too (in case this runs standalone)
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
const MONGO_URI_PROD = process.env.MONGO_URI_PROD;

const MONGO_URI = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_DEV;

console.log('🔍 NODE_ENV:', NODE_ENV);
console.log('🔍 MONGO_URI_DEV:', MONGO_URI_DEV);
console.log('🔍 MONGO_URI_PROD:', MONGO_URI_PROD);
console.log('🔍 MONGO_URI SELECTED:', MONGO_URI);

export const connectToMongo = async () => {
  if (!MONGO_URI || typeof MONGO_URI !== 'string') {
    throw new Error('MONGO_URI is undefined or invalid.');
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connected to MongoDB [${NODE_ENV}]`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};