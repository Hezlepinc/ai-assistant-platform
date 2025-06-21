// server/routes/assistantRouter.js

import express from 'express';
import { routeToAssistant } from '../ai-architect-core/routes/AssistantDispatcher.js';

const router = express.Router();

router.post('/:id/ask', async (req, res) => {
  const assistantId = req.params.id;
  const { message, sessionId } = req.body;

  try {
    const result = await routeToAssistant({ assistantId, message, sessionId });
    res.json(result);
  } catch (err) {
    console.error('Assistant routing error:', err);
    res.status(500).json({ error: 'Failed to route message to assistant' });
  }
});

export default router;