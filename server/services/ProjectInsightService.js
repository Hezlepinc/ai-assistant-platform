// server/services/ProjectInsightService.js
import { snapshotDirectory } from '../analysis/deepProjectSnapshot.js';

export async function analyzeProjectInsights(projectPath) {
  const snapshot = snapshotDirectory(projectPath);

  const todos = [];
  const exports = [];
  const files = [];

  for (const file of snapshot) {
    files.push(file.path);
    todos.push(...(file.todos || []));
    exports.push(...(file.exports || []));
  }

  return {
    success: true,
    filesScanned: files.length,
    todos,
    exports,
    summary: `Scanned ${files.length} files. Found ${todos.length} TODOs and ${exports.length} exports.`,
  };
}