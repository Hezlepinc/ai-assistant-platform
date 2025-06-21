// scripts/fullSync.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { syncDevNotes } from './importDevNotes.js';
import { upsertVectors } from './upsertDevNotesToPinecone.js';
import { generateProjectMap } from './generateProjectMap.js';
import { execSync } from 'child_process';

dotenv.config();

const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

async function runFullSync() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('📘 Syncing DevNotes to MongoDB...');
    await syncDevNotes();

    console.log('🧠 Upserting vectors to Pinecone...');
    await upsertVectors();

    console.log('🗺️ Generating project map...');
    await generateProjectMap();

    console.log('🧭 Regenerating sitemap...');
    execSync('node server/tools/generateSitemap.js', { stdio: 'inherit' });

    console.log('✅ Full sync complete.');
  } catch (err) {
    console.error('❌ Sync failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

runFullSync();