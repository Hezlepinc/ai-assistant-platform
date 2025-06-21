// server/analysis/deepProjectSnapshot.js

import fs from 'fs';
import path from 'path';
import { findTodosInFile } from '../ai-architect-core/utils/todoFinder.js';
import { getAllFiles } from '../ai-architect-core/utils/fileService.js';

/**
 * Recursively scans the project directory and extracts basic insights.
 */
function snapshotDirectory(projectPath) {
  const files = getAllFiles(projectPath);
  const fileSnapshots = files.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const todos = findTodosInFile(content);
    return {
      path: filePath,
      todoCount: todos.length,
      todos,
    };
  });
  return fileSnapshots;
}

/**
 * Aggregates high-level project insights based on file scan.
 */
function analyzeProjectInsights(projectPath) {
  const snapshot = snapshotDirectory(projectPath);
  const todos = snapshot.flatMap(f => f.todos.map(t => `${f.path}: ${t}`));
  const summary = `Analyzed ${snapshot.length} files. Found ${todos.length} TODOs.`;

  return {
    projectPath,
    summary,
    todos,
  };
}

export {
  snapshotDirectory,
  analyzeProjectInsights
};