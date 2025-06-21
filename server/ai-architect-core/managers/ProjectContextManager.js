// server/ai-architect-core/managers/ProjectContextManager.js

import fs from 'fs';
import path from 'path';
import { getProjectPathForSession } from '../utils/pathUtils.js';
import { snapshotDirectory } from '../../analysis/deepProjectSnapshot.js';
import { analyzeDependencies, findRedundantFiles } from '../utils/dependencyTracker.js';

export default class ProjectContextManager {
  async getProjectSummary(sessionId) {
    try {
      // 🔍 Resolve base project path
      const projectPath = await getProjectPathForSession(sessionId);
      if (!projectPath) throw new Error('Project path not found for session');

      // 📁 Step 1: Snapshot all project files
      const fileData = snapshotDirectory(projectPath);

      // ✅ Step 2: Extract project content insights
      const todos = fileData.flatMap(f => f.todos || []);
      const exports = fileData.flatMap(f => f.exports || []);

      // 🔍 Step 3: Analyze dependencies and detect redundant files
      const [importDeps, redundantFiles] = await Promise.all([
        analyzeDependencies(projectPath),
        findRedundantFiles(projectPath),
      ]);

      // 📂 Step 4: Load raw PROJECT_SITEMAP.md contents
      let sitemap = '';
      const sitemapPath = path.join(projectPath, 'PROJECT_SITEMAP.md');
      if (fs.existsSync(sitemapPath)) {
        sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      }

      // 📊 Step 5: High-level summary
      const projectInsights = [
        `Project has ${fileData.length} scanned files.`,
        `${todos.length} TODOs detected.`,
        `${exports.length} named exports found.`,
        `${redundantFiles.length} possible redundant test files.`,
        `${importDeps.length} total unique imports found.`,
      ];

      // 🧠 Return context object
      return {
        todos,
        exports,
        redundantFiles,
        sitemap,
        projectInsights,
      };
    } catch (err) {
      console.error('❌ ProjectContextManager failed:', err);
      return null;
    }
  }
}