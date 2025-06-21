// server/ai-architect-core/config/pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME);

export { pineconeClient, pineconeIndex };