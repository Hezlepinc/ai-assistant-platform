// server/ai-architect-core/config/pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

let pineconeClient = null;

/**
 * Initializes Pinecone client and selects index.
 * @returns {PineconeIndex}
 */
export function initializePineconeClient() {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    controllerHostUrl: `https://${process.env.PINECONE_ENVIRONMENT}.pinecone.io`,
  });

  pineconeClient = client.Index(process.env.PINECONE_INDEX_NAME);
  return pineconeClient;
}

export { pineconeClient };