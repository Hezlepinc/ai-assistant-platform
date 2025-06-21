import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import mongoose from 'mongoose';
import DevNote from '../server/models/DevNote.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

await mongoose.connect(MONGO_URI);
console.log('✅ Connected to MongoDB');

const devNotesDir = path.resolve('./dev_notes');
const files = fs.readdirSync(devNotesDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(devNotesDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: meta, content } = matter(raw);

  if (!meta.title) {
    console.warn(`⚠️ Skipping file without title: ${file}`);
    continue;
  }

  const updatedDoc = {
    title: meta.title,
    tags: meta.tags || [],
    project: meta.project || 'ai-assistant-platform',
    source: meta.source || 'manual_review',
    timestamp: new Date(meta.timestamp || Date.now()),
    content: raw,
  };

  await DevNote.findOneAndUpdate(
    { title: meta.title },
    updatedDoc,
    { upsert: true, new: true }
  );

  console.log(`✅ Synced: ${meta.title}`);
}

console.log('✅ All DevNotes updated in MongoDB.');
process.exit();