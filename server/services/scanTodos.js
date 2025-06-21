// server/services/scanTodos.js

import { snapshotDirectory } from '../analysis/deepProjectSnapshot.js';
import { getProjectPathForSession } from '../ai-architect-core/utils/pathUtils.js';

/**
 * Scans for TODO comments in the session's project files.
 * @param {string} sessionId
 * @returns {Promise<string[]>} Array of TODO messages
 */
export async function scanTodos(sessionId) {
  const projectPath = await getProjectPathForSession(sessionId);
  const files = snapshotDirectory(projectPath);

  const todos = files.flatMap(file => file.todos || []);
  return todos;
}