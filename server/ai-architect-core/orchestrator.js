// server/ai-architect-core/orchestrator.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ContextInjector from './managers/ContextInjector.js';
import { getGptResponse } from '../../server/logic/gptChat.js';
import { logChatMessage } from './utils/chatLogger.js'; // ✅ Ensure this exists or create a stub

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPromptPath = path.resolve(__dirname, 'prompts/systemPrompt.txt');
const baseSystemPrompt = fs.readFileSync(systemPromptPath, 'utf-8');

const contextInjector = new ContextInjector();

export async function orchestratorChat({ sessionId, message }) {
  try {
    // STEP 1: Build dynamic context (DevNotes, project, memory, etc.)
    const contextBlock = await contextInjector.getContextForSession(sessionId, {}, message);
    const fullPrompt = `${baseSystemPrompt}\n\n${contextBlock}\n\nUser: ${message}\nAI:`;

    // STEP 2: Get GPT response
    const response = await getGptResponse(message, fullPrompt);

    // STEP 3: Log the interaction
    await logChatMessage({ sessionId, sender: 'user', text: message });
    await logChatMessage({ sessionId, sender: 'ai', text: response });

    return {
      response,
      intent: 'general',
      confidence: 1.0,
      assistant: 'ai-architect',
      isFallback: false,
    };
  } catch (err) {
    console.error('❌ Orchestrator error:', err);
    return {
      response: '⚠️ Assistant failed to respond.',
      intent: 'error',
      confidence: 0,
      assistant: 'ai-architect',
      isFallback: true,
    };
  }
}