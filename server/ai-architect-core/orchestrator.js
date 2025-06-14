import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ContextInjector from './managers/ContextInjector.js';
import { getGptResponse } from '../../server/logic/gptChat.js'; // Adjusted for relative path

// Handle __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load system-level instruction once
const systemPromptPath = path.resolve(__dirname, 'prompts/systemPrompt.txt');
const baseSystemPrompt = fs.readFileSync(systemPromptPath, 'utf-8');

const contextInjector = new ContextInjector();

export async function orchestratorChat({ message, sessionId }) {
  try {
    const session = {
      sessionId,
      message,
      intent: 'general', // Temporary default
    };

    // Inject relevant DevNote context
    const contextBlock = await contextInjector.buildPromptContext(session);

    // Construct the final prompt
    const fullPrompt = `${baseSystemPrompt}\n\n${contextBlock}`;

    const response = await getGptResponse(message, fullPrompt);
    return response;
  } catch (err) {
    console.error('❌ Orchestrator error:', err);
    return '⚠️ Assistant failed to respond.';
  }
}