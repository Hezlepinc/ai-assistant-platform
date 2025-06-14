import express from 'express';
import { orchestratorChat } from '../ai-architect-core/orchestrator.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // 🔍 Log incoming message payload
    console.log('[🛠️ CHAT ROUTER] Incoming request:', { message, sessionId });

    const response = await orchestratorChat({ message, sessionId });
    res.json({ response });
  } catch (err) {
    console.error('❌ Chat error:', err);
    res.status(500).json({ error: 'Chat failed' });
  }
});

export default router;