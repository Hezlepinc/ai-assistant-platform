import express from 'express';
import fs from 'fs';
import path from 'path';
import { decodePath } from '../ai-architect-core/utils/pathUtils.js';
import { PROJECTS_BASE_PATH } from '../ai-architect-core/config/constants.js';

const router = express.Router();

// Load file
router.get('/files/:encodedPath', (req, res) => {
  const filePath = decodePath(req.params.encodedPath);
  const fullPath = path.join(PROJECTS_BASE_PATH, filePath);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file', detail: err.message });
  }
});

// Save edits
router.post('/files/:encodedPath', (req, res) => {
  const filePath = decodePath(req.params.encodedPath);
  const fullPath = path.join(PROJECTS_BASE_PATH, filePath);
  const content = req.body.content;

  try {
    fs.writeFileSync(fullPath, content, 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write file', detail: err.message });
  }
});

// Delete file
router.delete('/files/:encodedPath', (req, res) => {
  const filePath = decodePath(req.params.encodedPath);
  const fullPath = path.join(PROJECTS_BASE_PATH, filePath);

  try {
    fs.unlinkSync(fullPath);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file', detail: err.message });
  }
});

export default router;