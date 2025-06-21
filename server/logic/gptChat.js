// server/logic/gptChat.js

import { OpenAI } from 'openai';
import ContextInjector from '../ai-architect-core/managers/ContextInjector.js';
import { logChatMessage } from '../ai-architect-core/utils/chatLogger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const contextInjector = new ContextInjector();

/**
 * Get GPT-4o response with full context injection.
 * @param {string} userMessage - Message from user
 * @param {string|null} sessionId - Session identifier for context awareness
 * @returns {Promise<string>} Response from GPT
 */
export async function getGptResponse(userMessage, sessionId = null) {
  try {
    console.log('🔑 Using OpenAI Key:', process.env.OPENAI_API_KEY?.slice(0, 8));

    const context = await contextInjector.getContextForSession(sessionId, {}, userMessage);

    const messages = [
      { role: 'system', content: context },
      { role: 'user', content: userMessage },
    ];

    console.log('🧠 Sending to GPT:', messages);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });

    const reply = completion.choices[0]?.message?.content || '(No reply)';
    console.log('✅ GPT response:', reply);

    if (sessionId) {
      await logChatMessage({
        sessionId,
        sender: 'assistant',
        message: reply,
        timestamp: new Date(),
        source: 'gpt',
      });
    }

    return reply;
  } catch (err) {
    console.error('❌ GPT Error:', err.response?.data || err.message || err);
    return '⚠️ GPT encountered an error.';
  }
}