// client/src/components/QuickActionsDropdown.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../api'; // ✅ uses configured baseURL + projectId injection

function QuickActionsDropdown({ onQuickActionResult }) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (!action || loading) return;

    const sessionId = localStorage.getItem('chatSessionId');
    setLoading(true);

    try {
      if (action === 'preview_full_prompt_context') {
        const res = await axios.post('/project-insight/context-preview', {
          sessionId,
          message: '',
        });

        const data = res.data;

        if (data.success) {
          const text = `📄 Context Preview:\n\n${data.context}`;
          onQuickActionResult?.({ sender: 'ai', text, isHtml: false });
        } else {
          onQuickActionResult?.({ sender: 'ai', text: '⚠️ Failed to load context.' });
        }

        return;
      }

      const res = await axios.post('/quick-action', {
        action,
        sessionId,
      });

      const data = res.data;

      if (data.success) {
        const formatted = formatResult(action, data.result);
        onQuickActionResult?.({ sender: 'ai', text: formatted });
      } else {
        onQuickActionResult?.({ sender: 'ai', text: `⚠️ Action failed: ${action}` });
      }
    } catch (err) {
      console.error('❌ QuickAction error:', err);
      onQuickActionResult?.({ sender: 'ai', text: '❌ QuickAction failed to execute.' });
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (action, result) => {
    switch (action) {
      case 'run_system_health_check':
        return `🩺 Health Check:\n\n${JSON.stringify(result, null, 2)}`;

      case 'scan_project_todos':
        return result.length
          ? `🔧 TODOs:\n\n${result.map((t) => `• ${t}`).join('\n')}`
          : '✅ No TODOs found.';

      case 'suggest_improvements':
        return result.length
          ? `🚀 Suggestions:\n\n${result.map((i) => `• ${i}`).join('\n')}`
          : '👍 No improvements found.';

      case 'regenerate_prompt_context':
        return '📦 Context Regenerated with latest insights.';

      case 'explain_file':
      case 'explain-file':
        return `📄 Explanation:\n\n${result}`;

      default:
        return JSON.stringify(result, null, 2);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 12, right: 20 }}>
      <select
        disabled={loading}
        onChange={(e) => handleAction(e.target.value)}
        defaultValue=""
        style={{ padding: '6px', fontSize: '1rem' }}
      >
        <option value="" disabled>Quick Actions</option>
        <option value="run_system_health_check">Run System Health Check</option>
        <option value="scan_project_todos">Scan Project for TODOs</option>
        <option value="suggest_improvements">Suggest Improvements</option>
        <option value="regenerate_prompt_context">Regenerate Prompt Context</option>
        <option value="preview_full_prompt_context">Preview Full Prompt Context</option>
        <option value="explain_file">Explain GPT Chat File</option>
      </select>
    </div>
  );
}

QuickActionsDropdown.propTypes = {
  onQuickActionResult: PropTypes.func.isRequired,
};

export default QuickActionsDropdown;