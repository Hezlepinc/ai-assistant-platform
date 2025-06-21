import path from 'path';
import snapshotDirectory from '../analysis/deepProjectSnapshot.js';
import { storeProjectSummary } from '../utils/projectSummaryStore.js';
import { getProjectRoot } from '../config/constants.js';

function summarizeSnapshot(snapshot) {
  const summary = {
    totalFiles: snapshot.length,
    totalTodos: 0,
    filesByType: {},
    exportsMap: {},
  };

  for (const file of snapshot) {
    const ext = file.extension || 'unknown';
    summary.totalTodos += file.todos?.length || 0;
    summary.filesByType[ext] = (summary.filesByType[ext] || 0) + 1;
    if (file.exports.length) {
      summary.exportsMap[file.path] = file.exports;
    }
  }

  return summary;
}

export default async function generateProjectSummary(sessionId) {
  try {
    const rootPath = getProjectRoot();
    const snapshot = snapshotDirectory(rootPath);
    const summary = summarizeSnapshot(snapshot);

    await storeProjectSummary(sessionId, summary);

    return summary;
  } catch (err) {
    console.error('❌ Failed to generate project summary:', err);
    throw new Error('Project summary generation failed');
  }
}