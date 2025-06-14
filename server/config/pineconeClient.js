// server/config/pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT, // e.g., 'us-east1-gcp'
});

export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME); // Your index name