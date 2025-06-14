import express from 'express';
import FeedbackLog from '../models/FeedbackLog.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, sessionId, rating, intent, confidence, modelUsed, fallbackUsed } = req.body;

    const log = new FeedbackLog({
      message,
      sessionId,
      rating,
      intent,
      confidence,
      modelUsed,
      fallbackUsed,
    });

    await log.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('❌ Feedback logging failed:', err);
    res.status(500).json({ error: 'Feedback logging failed' });
  }
});

export default router;