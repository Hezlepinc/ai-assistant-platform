// scripts/vectorDiagnostics.js
import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.Index(PINECONE_INDEX_NAME);

async function runDiagnostics() {
  try {
    const stats = await index.describeIndexStats({});
    console.log('📊 Pinecone Index Stats:\n', JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('❌ Error fetching Pinecone stats:', error.message);
  }
}

runDiagnostics();