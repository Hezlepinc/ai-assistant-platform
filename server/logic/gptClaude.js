// server/logic/gptClaude.js

import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_KEY, // Optional fallback
});

/**
 * Get a Claude response from Anthropic API.
 * @param {string} userMessage - User's input message
 * @param {string} context - Context injected before the user message
 * @param {string} [model] - Claude model name (default: claude-3-opus-20240229)
 * @returns {Promise<string>} - Assistant reply or error message
 */
export async function getClaudeResponse(userMessage, context = '', model = 'claude-3-opus-20240229') {
  try {
    const fullPrompt = `${context}\n\n${userMessage}`;

    const response = await anthropic.messages.create({
      model,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: fullPrompt }
      ]
    });

    const reply = response?.content?.[0]?.text || '(No reply)';
    console.log('🤖 Claude response:', reply);
    return reply;
  } catch (error) {
    console.error('❌ Claude Error:', error.response?.data || error.message || error);
    return '⚠️ Claude encountered an error.';
  }
}