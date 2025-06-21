import fs from 'fs/promises';
import path from 'path';

export default async function getFileContent(filePath) {
  const fullPath = path.resolve(filePath);
  const content = await fs.readFile(fullPath, 'utf-8');
  return content;
}