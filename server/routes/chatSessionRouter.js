import express from 'express';
import ChatSession from '../models/ChatSession.js';
import ChatLog from '../models/ChatLog.js';

const router = express.Router();

// GET /api/sessions
router.get('/', async (req, res) => {
  try {
    const all = await ChatSession.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.error('❌ Failed to fetch sessions:', err);
    res.status(500).json({ error: 'Failed to get sessions' });
  }
});

// POST /api/sessions
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Session name is required' });

  try {
    const session = await ChatSession.create({ name });
    res.json(session);
  } catch (err) {
    console.error('❌ Failed to create session:', err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// DELETE /api/sessions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ChatSession.findByIdAndDelete(id);
    await ChatLog.deleteMany({ sessionId: id });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to delete session:', err);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

// PUT /api/sessions/:id – Rename session
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'New session name required' });

  try {
    const updated = await ChatSession.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to rename session:', err);
    res.status(500).json({ error: 'Failed to rename session' });
  }
});

// GET /api/sessions/:id/messages – Return formatted messages
router.get('/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await ChatLog.find({ sessionId: id }).sort({ timestamp: 1 });

    const formatted = messages.map((entry) => ({
      sender: entry.sender,
      text: entry.message,
      isHtml: false,
      meta: {
        assistant: entry.assistant,
        intent: entry.intent,
        confidence: entry.confidence,
      },
    }));

    res.json(formatted);
  } catch (err) {
    console.error('❌ Failed to load messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// GET /api/sessions/:id/debug – Return raw log entries (Mongo shape)
router.get('/:id/debug', async (req, res) => {
  const { id } = req.params;

  try {
    const logs = await ChatLog.find({ sessionId: id }).sort({ timestamp: 1 });
    res.json(logs);
  } catch (err) {
    console.error('❌ Failed to load raw logs:', err);
    res.status(500).json({ error: 'Failed to fetch raw logs' });
  }
});

export default router;