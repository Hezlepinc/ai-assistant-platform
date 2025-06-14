import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..'); // Only scans ai-assistant-platform
const OUTPUT_FILE = path.join(ROOT_DIR, 'PROJECT_SITEMAP.md');
const IGNORED_DIRS = ['node_modules', '.git', 'dist', 'build', 'logs', '.vscode'];

function walk(dir, depth = 0) {
  const indent = '  '.repeat(depth);
  let output = '';

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (IGNORED_DIRS.includes(item.name)) continue;
    if (item.name.startsWith('.')) continue;

    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      output += `${indent}- 📁 ${item.name}/\n`;
      output += walk(fullPath, depth + 1);
    } else {
      output += `${indent}- 📄 ${item.name}\n`;
    }
  }

  return output;
}

const sitemap = `# 📦 AI Assistant Platform – Project Sitemap\n\n${walk(ROOT_DIR)}`;
fs.writeFileSync(OUTPUT_FILE, sitemap);

console.log(`✅ Sitemap updated at: ${OUTPUT_FILE}`);