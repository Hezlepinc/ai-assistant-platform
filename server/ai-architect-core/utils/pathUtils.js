// server/utils/pathUtils.js
import redisClient from '../config/redisClient.js';

/**
 * Decode base64-encoded file paths (still useful for manual debugging)
 */
export const decodePath = (encoded) => {
  return Buffer.from(encoded, 'base64').toString('utf8');
};

/**
 * Retrieve the project path for a session from Redis (fallbacks to env or cwd)
 */
export async function getProjectPathForSession(sessionId) {
  const redisKey = `projectPath:${sessionId}`;
  const path = await redisClient.get(redisKey);
  return path || process.env.PROJECT_PATH || process.cwd();
}