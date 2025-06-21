// server/ai-architect-core/utils/fileService.js

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

/**
 * Reads file content from a relative path within the server directory.
 * @param {string} relativePath - Relative path from /server
 * @returns {Promise<string>} File content or error message
 */
export async function getFileContent(relativePath) {
  const fullPath = path.resolve(process.cwd(), 'server', relativePath);
  try {
    const data = await fs.readFile(fullPath, 'utf-8');
    return data;
  } catch (err) {
    console.error(`❌ Failed to read file at ${fullPath}:`, err);
    return `⚠️ Could not load content from ${relativePath}`;
  }
}

/**
 * Recursively gets all file paths in a directory
 * @param {string} dirPath - Absolute or relative path
 * @param {string[]} arrayOfFiles - Used internally for recursion
 * @returns {string[]} Array of full file paths
 */
export function getAllFiles(dirPath, arrayOfFiles = []) {
  const entries = fsSync.readdirSync(dirPath);

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    if (fsSync.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}