// server/utils/dependencyTracker.js
import fs from 'fs';
import path from 'path';

export async function analyzeDependencies(projectPath) {
  const imports = new Set();
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.name.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = [...content.matchAll(/import .* from ['"](.*)['"]/g)];
        matches.forEach((m) => imports.add(m[1]));
      }
    }
  }
  walk(projectPath);
  return Array.from(imports);
}

export async function findRedundantFiles(projectPath) {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.name.endsWith('.test.js') || entry.name.endsWith('.spec.js')) {
        files.push(fullPath);
      }
    }
  }
  walk(projectPath);
  return files;
}