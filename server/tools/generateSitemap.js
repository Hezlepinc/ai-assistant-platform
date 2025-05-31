const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../'); // Project root
const IGNORE = ['node_modules', '.git', '.vscode', '.DS_Store', 'dist', 'build'];

function generateSitemap(dir, depth = 0) {
  const indent = '  '.repeat(depth);
  let result = '';

  let entries = fs.readdirSync(dir).filter(
    (entry) => !IGNORE.includes(entry)
  );

  entries.sort((a, b) => {
    const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);
    const displayName = stats.isDirectory() ? `📁 ${entry}/` : `📄 ${entry}`;
    result += `${indent}- ${displayName}\n`;

    if (stats.isDirectory()) {
      result += generateSitemap(fullPath, depth + 1);
    }
  }

  return result;
}

const output = generateSitemap(ROOT_DIR);
const outputPath = path.join(ROOT_DIR, 'PROJECT_SITEMAP.md');

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Sitemap generated at ${outputPath}`);