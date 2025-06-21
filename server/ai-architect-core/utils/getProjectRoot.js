import path from 'path';
import { fileURLToPath } from 'url';

export function getProjectRoot() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../../');
}