// server/routes/devNoteRouter.js
import express from 'express';
import DevNote from '../models/DevNote.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { tags, project } = req.query;
    const query = {};

    // Default project fallback
    query.project = project || 'ai-assistant-platform';

    // Optional tag filtering
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const notes = await DevNote.find(query).sort({ timestamp: -1 });
    res.json({ notes });
  } catch (err) {
    console.error('❌ Error fetching DevNotes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

export default router;