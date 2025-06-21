// server/routes/inchargeRouter.js

import express from 'express';
import inchargeAssistant from '../../company-integrations/incharge-electric/assistant.js';

const router = express.Router();

/**
 * POST /api/incharge/ask
 * Body: { message: String, context?: Object }
 */
router.post('/ask', async (req, res) => {
  const { message, context = {} } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const reply = await inchargeAssistant({ message, context });
    res.json({ reply });
  } catch (error) {
    console.error('❌ Incharge Assistant Error:', error);
    res.status(500).json({ error: 'Assistant failed to respond.' });
  }
});

export default router;