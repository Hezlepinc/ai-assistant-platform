// server/ai-architect-core/utils/chatLogger.js

import ChatLog from '../../../server/models/ChatLog.js';

export async function logChatMessage({ sessionId, sender, text, meta = {} }) {
  try {
    await ChatLog.create({
      sessionId,
      sender,
      message: text,
      meta
    });
  } catch (err) {
    console.error('❌ Failed to log chat message:', err);
  }
}