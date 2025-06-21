import express from 'express';
import fs from 'fs';
import path from 'path';

import { analyzeProjectInsights } from '../services/ProjectInsightService.js';
import ContextInjector from '../ai-architect-core/managers/ContextInjector.js';
import ProjectContextManager from '../ai-architect-core/managers/ProjectContextManager.js';

const router = express.Router();
const contextInjector = new ContextInjector();
const projectContextManager = new ProjectContextManager();

// Legacy: Analyze by direct project path
router.get('/', async (req, res) => {
  const projectPath = req.query.path || path.resolve('./');
  if (!fs.existsSync(projectPath)) {
    return res.status(400).json({ error: 'Project path does not exist' });
  }

  try {
    const insights = await analyzeProjectInsights(projectPath);
    res.json(insights);
  } catch (err) {
    console.error('❌ Insight error:', err);
    res.status(500).json({ error: 'Failed to analyze project' });
  }
});

// New: Generate full context block using sessionId + message
router.post('/context-preview', async (req, res) => {
  const { sessionId, message = '' } = req.body;

  try {
    const extraContext = await projectContextManager.getProjectSummary(sessionId);
    const fullContext = await contextInjector.getContextForSession(sessionId, extraContext, message);

    res.json({ success: true, context: fullContext });
  } catch (err) {
    console.error('❌ Context preview failed:', err);
    res.status(500).json({ success: false, error: 'Context generation failed.' });
  }
});

export default router;