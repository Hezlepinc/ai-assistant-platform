import express from 'express';
import { orchestratorChat } from '../ai-architect-core/orchestrator.js';
import ChatLog from '../models/ChatLog.js';
import { getSessionById } from '../models/ChatSession.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    console.log('[🛠️ CHAT ROUTER] Incoming request:', { message, sessionId });

    // 🔹 Ensure session exists (autocreates with first message as title)
    await getSessionById(sessionId, message);

    // 🔹 Save user message
    await ChatLog.create({
      sessionId,
      sender: 'user',
      message,
    });

    // 🧠 Get assistant response
    const result = await orchestratorChat({ message, sessionId });

    const {
      response,
      intent = 'unknown',
      confidence = 0,
      assistant = 'unknown',
      isFallback = false,
    } = result;

    // 🔹 Save AI message (only if string)
    if (typeof response === 'string') {
      await ChatLog.create({
        sessionId,
        sender: 'ai',
        message: response || '[No message returned]',
        meta: {
          intent,
          confidence,
          assistant,
          isFallback,
        },
      });
    } else {
      console.warn('[⚠️ CHAT ROUTER] Invalid response type from orchestrator:', typeof response);
    }

    // 🟢 Return structured result
    res.json({
      response,
      intent,
      confidence,
      assistant,
      fallbackUsed: isFallback,
    });

  } catch (err) {
    console.error('❌ Chat error:', err);
    res.status(500).json({ error: 'Chat failed' });
  }
});

export default router;