// server/services/healthCheck.js

/**
 * Basic health check for server status
 * @returns {Promise<Object>}
 */
export async function runHealthCheck() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version,
  };
}