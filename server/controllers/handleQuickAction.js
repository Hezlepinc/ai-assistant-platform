// server/controllers/handleQuickAction.js

import path from 'path';
import QuickActionLog from '../models/QuickActionLog.js';
import { runHealthCheck } from '../services/healthCheck.js';
import { scanTodos } from '../services/scanTodos.js';
import { suggestImprovements } from '../services/suggestImprovements.js';
import { snapshotDirectory } from '../analysis/deepProjectSnapshot.js';
import { regeneratePromptContext } from '../services/regenerateContext.js';
import { explainFile } from '../services/explainFile.js';

// 🔁 Support alternate action names from frontend
const actionAliases = {
  'run_system_health_check': 'health-check',
  'scan_project_todos': 'scan-todos',
  'suggest_improvements': 'suggest-improvements',
  'regenerate_prompt_context': 'regenerate-context',
  'preview_full_prompt_context': 'preview-full-context',
  'explain_file': 'explain-file'  // ✅ alias added
};

export default async function handleQuickAction(req, res) {
  console.log('🔍 Full Request Body:', req.body);
  let { action, sessionId } = req.body;

  action = actionAliases[action] || action;

  console.log('🔍 Raw Action:', req.body.action);
console.log('🔁 Normalized Action:', action);

  try {
    let result;
    let message = '';
    const projectPath = process.env.PROJECT_PATH || path.resolve('./');

    switch (action) {
      case 'health-check':
        result = await runHealthCheck();
        message = '✅ System Health Check completed:\n' + JSON.stringify(result, null, 2);
        break;

      case 'scan-todos':
        result = await scanTodos(sessionId);
        message = result.length
          ? `📝 Found ${result.length} TODOs:\n- ${result.join('\n- ')}`
          : '✅ No TODOs found.';
        break;

      case 'suggest-improvements':
        result = await suggestImprovements(sessionId);
        message = result.length
          ? `💡 Suggested Improvements:\n- ${result.join('\n- ')}`
          : '👍 No improvements necessary at this time.';
        break;

      case 'regenerate-context': {
        const insights = snapshotDirectory(projectPath);
        result = await regeneratePromptContext(sessionId, insights);
        message = '🔄 Context regenerated with latest project insights.';
        break;
      }

      case 'explain-file': {
        const targetFile = 'server/logic/gptChat.js'; // Optional: make this dynamic later
        result = await explainFile(targetFile);
        message = `📄 File Explanation for \`${targetFile}\`:\n\n${result}`;
        break;
      }

      case 'preview-full-context': {
        message = '🧠 Prompt context includes DevNotes, project summary, and recent chat logs.';
        result = { summary: 'Placeholder for prompt context preview.' };
        break;
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }

    await QuickActionLog.create({
      actionName: action,
      sessionId,
      input: req.body.input || '',
      result,
      status: 'success',
    });

    res.json({
      success: true,
      result,
      aiResponse: {
        role: 'assistant',
        content: message,
        timestamp: Date.now(),
        sessionId,
        source: 'quick-action',
      },
    });
  } catch (err) {
    console.error(`❌ Quick action failed: ${action}`, err);

    await QuickActionLog.create({
      actionName: action,
      sessionId,
      input: req.body.input || '',
      result: err.message,
      status: 'fail',
    });

    res.status(500).json({ error: 'Action failed' });
  }
}