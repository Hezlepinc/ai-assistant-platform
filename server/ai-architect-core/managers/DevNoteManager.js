import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DevNote from '../../models/DevNote.js';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

dotenv.config();

// MongoDB connection
const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI, { dbName: 'ai-assistant-platform' });
}

// Pinecone + Embedding Config
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

const embedder = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-large',
  openAIApiKey: process.env.OPENAI_API_KEY,
  dimensions: 1024,
});

class DevNoteManager {
  // === 🔍 MONGODB QUERIES ===
  async fetchNotesByIntent(intent) {
    if (!intent) return [];
    const notes = await DevNote.find({ intent }).lean();
    if (notes.length > 0) return notes;
    return await DevNote.find({ tags: { $in: ['core', 'default'] } }).lean();
  }

  async fetchNotesByTags(tags = []) {
    if (!tags.length) return [];
    return await DevNote.find({ tags: { $in: tags } }).lean();
  }

  async fetchSummaryByProject(projectName) {
    if (!projectName) return [];
    return await DevNote.find({ project: projectName }).select('title summary tags').lean();
  }

  async fetchAllDevNotes() {
    return await DevNote.find({}).lean();
  }

  // === 🤖 FUZZY SEARCH VIA PINECONE ===
  async searchNotesBySimilarity(query, topK = 5) {
    const embedding = await embedder.embedQuery(query);
    const result = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });

    return result.matches.map(match => ({
      id: match.id,
      score: match.score,
      title: match.metadata.title,
      intent: match.metadata.intent,
      tags: match.metadata.tags?.split(',') || [],
    }));
  }
}

export default DevNoteManager;