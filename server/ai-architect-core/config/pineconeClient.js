// server/ai-architect-core/config/pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  // You can optionally add controllerHostUrl if needed, like:
  // controllerHostUrl: `https://${process.env.PINECONE_ENVIRONMENT}.pinecone.io`
});

export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);