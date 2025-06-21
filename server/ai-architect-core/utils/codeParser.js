import fs from 'fs';
import path from 'path';

/**
 * Extract all relative import or require paths from a file's content,
 * resolve them to actual files, and return a list of resolved file paths.
 *
 * @param {string} fileContent - The raw content of the file.
 * @param {string} originPath - The full path of the file being scanned.
 * @returns {string[]} - Array of resolved file paths.
 */
export function extractImportedFiles(fileContent, originPath) {
  const importRegex = /(?:import\s+[^'"]*['"](.+?)['"]|require\(['"](.+?)['"]\))/g;
  const results = new Set();
  let match;

  while ((match = importRegex.exec(fileContent)) !== null) {
    const rawImport = match[1] || match[2];

    if (!rawImport || (!rawImport.startsWith('.') && !rawImport.startsWith('/'))) {
      continue; // Skip external packages
    }

    const resolved = path.resolve(path.dirname(originPath), rawImport);
    const candidates = [
      resolved,
      `${resolved}.js`,
      `${resolved}.jsx`,
      `${resolved}.ts`,
      `${resolved}.tsx`,
      `${resolved}/index.js`,
      `${resolved}/index.jsx`
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        results.add(filePath);
        break;
      }
    }
  }

  return Array.from(results);
}