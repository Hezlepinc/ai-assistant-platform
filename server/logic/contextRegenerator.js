// server/logic/contextRegenerator.js

import ChatSession from '../models/ChatSession.js';
import DevNote from '../models/DevNote.js';

/**
 * Regenerates and saves the prompt context for a given chat session
 * by summarizing DevNotes and project insights.
 */
export async function regeneratePromptContext(sessionId, projectInsights) {
  if (!sessionId) throw new Error('Missing sessionId for context regeneration');

  // Fetch DevNotes to use as context
  const notes = await DevNote.find().sort({ relevanceScore: -1 }).limit(5);
  const notesText = notes.map(n => `📌 ${n.title}\n${n.content}`).join('\n\n');

  // Combine project insights + dev notes
  const regenerated = `
📂 Project Path: ${projectInsights?.projectPath || 'Unknown'}

🧠 Key Insights:
${projectInsights?.summary || 'No insights available'}

📝 Dev Notes:
${notesText || 'No DevNotes found'}
  `.trim();

  // Update the session’s context
  await ChatSession.findByIdAndUpdate(sessionId, {
    context: regenerated,
  });

  return regenerated;
}