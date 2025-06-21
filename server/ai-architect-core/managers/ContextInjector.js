// server/ai-architect-core/managers/ContextInjector.js

import fs from 'fs';
import path from 'path';
import Fuse from 'fuse.js';
import DevNoteManager from './DevNoteManager.js';
import ProjectContextManager from './ProjectContextManager.js';
import { extractImportedFiles } from '../utils/codeParser.js';
import { getProjectRoot } from '../utils/getProjectRoot.js';
import ChatLogModel from '../../models/ChatLog.js';
import ChatSessionModel from '../../models/ChatSession.js';
import AssistantLogModel from '../../models/AssistantLog.js';
import QuickActionLog from '../../models/QuickActionLog.js';

const devNoteManager = new DevNoteManager();
const projectContextManager = new ProjectContextManager();

const fuzzyTagMap = [
  { tag: 'system_tiers', keywords: ['three tiers', '3 tiers', 'core layer', 'company integrations'] },
  { tag: 'memory_systems', keywords: ['redis', 'memory', 'mongodb', 'short-term', 'long-term'] },
  { tag: 'prompt_dsl_framework', keywords: ['dsl', 'prompt rules', 'config language'] },
  { tag: 'orchestrator_design', keywords: ['orchestrator', 'routing', 'dispatcher', 'router'] },
  { tag: 'future_features', keywords: ['future features', 'upcoming features', 'roadmap'] },
];

const fuse = new Fuse(
  fuzzyTagMap.flatMap(({ tag, keywords }) => keywords.map(k => ({ tag, keyword: k }))),
  { keys: ['keyword'], threshold: 0.4 }
);

function getFuzzyMatchedTags(message) {
  const results = fuse.search(message);
  const uniqueTags = [...new Set(results.map(r => r.item.tag))];
  return uniqueTags;
}

export default class ContextInjector {
  constructor() {
    this.defaultContext = 'You are an AI development assistant. Offer insightful, practical help.';
    this.fixedProjectPath = path.resolve('./'); // Locked to ai-assistant-platform
  }

  async getContextForSession(sessionId, extraContext = {}, latestMessage = '') {
    let context = this.defaultContext;

    try {
      const projectData = await projectContextManager.getProjectSummaryFromPath(this.fixedProjectPath);
      if (projectData) {
        const formatted = this._formatExtraContext(projectData);
        context += `\n\n---\n\n${formatted}`;
      }
    } catch (err) {
      console.warn('⚠️ Could not load locked project context:', err);
    }

    const tags = getFuzzyMatchedTags(latestMessage || '');
    let notes = [];

    if (tags.length > 0) {
      notes = await devNoteManager.fetchNotesByTags(tags);
    }

    if (notes.length > 0) {
      const devNoteContext = notes
        .map(n => `• ${n.title?.replace(/^#+\s*/, '')}\n${n.content}`)
        .join('\n\n');
      context += `\n\n---\n\nUse the following DevNotes to inform your response:\n\n${devNoteContext}`;
    }

    const recentLogs = await this._getRecentSessionLogs(sessionId);
    if (recentLogs?.length) {
      const logContext = recentLogs.map(log => `• ${log.role}: ${log.content}`).join('\n');
      context += `\n\n---\n\n🧠 Recent Conversation History:\n${logContext}`;
    }

    return context;
  }

  async injectFileAndDependencies(filepath) {
    const absolutePath = path.resolve(filepath);
    const root = getProjectRoot();
    if (!absolutePath.startsWith(root)) return null;

    const mainContent = fs.readFileSync(absolutePath, 'utf-8');
    const importedFiles = extractImportedFiles(mainContent, absolutePath);

    const dependencies = importedFiles
      .map(f => {
        const fullPath = path.resolve(path.dirname(absolutePath), f);
        return fs.existsSync(fullPath)
          ? { file: f, content: fs.readFileSync(fullPath, 'utf-8') }
          : null;
      })
      .filter(Boolean);

    return {
      file: filepath,
      content: mainContent,
      dependencies,
    };
  }

  _formatExtraContext(ctx) {
    const lines = [];

    if (ctx.todos?.length) {
      lines.push('🔧 TODOs Found:');
      ctx.todos.forEach((todo) => lines.push(`- ${todo}`));
    }

    if (ctx.exports?.length) {
      lines.push('\n📦 Exported Items:');
      ctx.exports.forEach((item) => lines.push(`- ${item}`));
    }

    if (ctx.redundantFiles?.length) {
      lines.push('\n🧹 Possible Redundant Files:');
      ctx.redundantFiles.forEach((file) => lines.push(`- ${file}`));
    }

    if (ctx.projectInsights?.length) {
      lines.push('\n📊 Project Insights:');
      ctx.projectInsights.forEach((insight) => lines.push(`- ${insight}`));
    }

    if (ctx.sitemap?.length) {
      lines.push('\n🗺️ Project Sitemap:\n');
      lines.push(ctx.sitemap);
    }

    return lines.join('\n');
  }

  async _getRecentSessionLogs(sessionId) {
    if (!sessionId) return [];
    try {
      const logs = await ChatLogModel.find({ sessionId }).sort({ timestamp: -1 }).limit(10);
      return logs.map(log => ({ role: log.sender || 'user', content: log.message }));
    } catch (err) {
      console.warn('⚠️ Could not load recent chat logs:', err);
      return [];
    }
  }
}