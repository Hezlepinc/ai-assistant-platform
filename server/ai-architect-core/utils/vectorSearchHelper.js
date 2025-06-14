// server/ai-architect-core/utils/vectorSearchHelper.js
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv';
dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

const embedder = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-large',
  openAIApiKey: process.env.OPENAI_API_KEY,
  dimensions: 1024,
});

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.index(PINECONE_INDEX_NAME);

export async function searchRelevantDevNotes(userQuery, topK = 3) {
  const queryEmbedding = await embedder.embedQuery(userQuery);

  const result = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return result.matches.map((match) => ({
    title: match.metadata.title,
    intent: match.metadata.intent,
    tags: match.metadata.tags?.split(',') || [],
    score: match.score,
  }));
}