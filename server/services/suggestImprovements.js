// server/services/suggestImprovements.js

import { scanTodos } from './scanTodos.js';

/**
 * Suggests improvements based on TODOs found in the project.
 * @param {string} sessionId
 * @returns {Promise<string[]>}
 */
export async function suggestImprovements(sessionId) {
  const todos = await scanTodos(sessionId);

  if (!todos.length) return [];

  return todos.map(todo => `Consider resolving: "${todo}"`);
}