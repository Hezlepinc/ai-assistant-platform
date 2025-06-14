// scripts/upsertDevNotesToPinecone.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import DevNote from '../server/models/DevNote.js';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';

// === 🔧 ENVIRONMENT CONFIG ===
const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

// === 🌐 CONNECT TO DATABASE ===
await mongoose.connect(MONGO_URI, {
  dbName: 'ai-assistant-platform',
});
console.log('✅ Connected to MongoDB');

// === 📦 LOAD DEVNOTES ===
const devNotes = await DevNote.find({}).lean();
console.log(`📄 Found ${devNotes.length} DevNotes`);

if (!devNotes.length) {
  console.warn('⚠️ No DevNotes to upload.');
  process.exit(0);
}

// === 🧠 EMBEDDING SETUP ===
const embedder = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-large',
  openAIApiKey: process.env.OPENAI_API_KEY,
  dimensions: 1024,
});

// === 🌲 PINECONE SETUP ===
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.index(PINECONE_INDEX_NAME);

// === 🧠➡️🌲 EMBED + UPSERT ===
const vectors = [];

for (const note of devNotes) {
  const inputText = `${note.title}\n\n${note.summary || note.content || ''}`;
  const embedding = await embedder.embedQuery(inputText);

  vectors.push({
    id: note._id.toString(),
    values: embedding,
    metadata: {
      title: note.title,
      intent: note.intent,
      tags: (note.tags || []).join(','),
    },
  });
}

await index.upsert(vectors);
console.log(`✅ Successfully upserted ${vectors.length} vectors to Pinecone`);

process.exit(0);