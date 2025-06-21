import ContextInjector from '../ai-architect-core/managers/ContextInjector.js';

const contextInjector = new ContextInjector();

/**
 * Rebuilds prompt context for a session.
 * @param {string} sessionId - Chat session ID
 * @returns {Promise<{ success: boolean, summary?: string, error?: string }>}
 */
export async function regeneratePromptContext(sessionId) {
  try {
    const contextBlock = await contextInjector.getContextForSession(sessionId);

    const summary = contextBlock
      ? contextBlock.slice(0, 1000) + (contextBlock.length > 1000 ? '...' : '')
      : '[No context generated]';

    return {
      success: true,
      summary,
    };
  } catch (err) {
    console.error('❌ Error regenerating prompt context:', err);
    return {
      success: false,
      error: 'Failed to regenerate context',
    };
  }
}