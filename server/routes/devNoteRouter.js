import express from 'express';
import DevNote from '../models/DevNote.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { tags, project } = req.query;
  const query = {};

  if (tags) query.tags = { $in: tags.split(',') };
  if (project) query.project = project;

  const notes = await DevNote.find(query).sort({ createdAt: -1 });
  res.json(notes);
});

export default router;