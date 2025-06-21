import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

/**
 * Read a file's raw content.
 */
export async function getFileContent(filePath) {
  const resolvedPath = path.resolve(filePath);
  try {
    const content = await fs.readFile(resolvedPath, 'utf-8');
    return content;
  } catch (err) {
    console.error(`❌ Failed to read file: ${resolvedPath}`, err);
    return `⚠️ Could not load file: ${filePath}`;
  }
}

/**
 * Load and parse a JSON file.
 */
export async function getJsonContent(filePath) {
  try {
    const content = await getFileContent(filePath);
    return JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to parse JSON from ${filePath}:`, err);
    return null;
  }
}

/**
 * Recursively list all files in a directory.
 * Optionally filter by extension (e.g., ['.js', '.md']).
 */
export async function listFilesInDir(dirPath, filterExts = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return await listFilesInDir(fullPath, filterExts);
    } else {
      const ext = path.extname(entry.name);
      if (filterExts.length === 0 || filterExts.includes(ext)) {
        return fullPath;
      }
      return null;
    }
  }));

  return files.flat().filter(Boolean);
}

/**
 * Compute a SHA-256 hash of a file's content.
 */
export async function getFileHash(filePath) {
  try {
    const content = await fs.readFile(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (err) {
    console.error(`❌ Failed to hash file: ${filePath}`, err);
    return null;
  }
}