import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assistantId: { type: String, default: 'architect' }, // default AI architect assistant
  project: { type: String, default: 'ai-assistant-platform' }, // default project scope
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Optional: Automatically update `updatedAt` on modification
chatSessionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const ChatSessionModel = mongoose.model('ChatSession', chatSessionSchema);

/**
 * Get or create a session by ID or name.
 * If not found, it creates one using the first message or timestamp as title.
 * @param {string} sessionId - Session name or ID
 * @param {string} [firstMessage] - Optional first message for naming
 * @returns {Promise<Object|null>}
 */
export async function getSessionById(sessionId, firstMessage = null) {
  try {
    let session = await ChatSessionModel.findOne({ name: sessionId });

    if (!session) {
      const fallbackName = firstMessage
        ? firstMessage.slice(0, 60)
        : `Chat @ ${new Date().toLocaleString()}`;

      console.warn(`⚠️ Session not found, creating new one: ${fallbackName}`);
      session = await ChatSessionModel.create({
        name: fallbackName,
        assistantId: 'architect',
        project: 'ai-assistant-platform',
      });
    }

    return session;
  } catch (err) {
    console.error('❌ Failed to fetch or create chat session:', err);
    return null;
  }
}

/**
 * Explicitly create a session with a given name.
 * @param {string} name
 * @param {string} [assistantId]
 * @returns {Promise<Object>}
 */
export async function createSession(name, assistantId = 'architect') {
  const session = new ChatSessionModel({
    name,
    assistantId,
    project: 'ai-assistant-platform',
  });
  return await session.save();
}

export default ChatSessionModel;