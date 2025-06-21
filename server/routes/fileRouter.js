// server/routes/fileRouter.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const basePath = path.resolve(process.cwd(), 'server'); // Adjust as needed
  const filePath = path.join(basePath, filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ content: data });
  });
});

export default router;