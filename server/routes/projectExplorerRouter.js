import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Base directory where all projects live
const PROJECTS_BASE_PATH = process.env.PROJECTS_BASE_PATH || path.resolve('projects');

// GET /api/projects – list available project folders
router.get('/', (req, res) => {
  try {
    const projectDirs = fs.readdirSync(PROJECTS_BASE_PATH, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((dir) => ({
        id: dir.name,
        name: dir.name,
        path: path.join(PROJECTS_BASE_PATH, dir.name),
      }));

    res.json(projectDirs);
  } catch (err) {
    console.error('❌ Failed to read projects:', err);
    res.status(500).json({ error: 'Failed to list project folders' });
  }
});

// GET /api/projects/:projectId/files – recursive file tree
router.get('/:projectId/files', (req, res) => {
  const { projectId } = req.params;
  const projectPath = path.join(PROJECTS_BASE_PATH, projectId);

  const walk = (dir) => {
    const result = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relative = path.relative(projectPath, fullPath);

      if (entry.isDirectory()) {
        result.push({
          type: 'directory',
          name: entry.name,
          path: relative,
          children: walk(fullPath),
        });
      } else {
        result.push({
          type: 'file',
          name: entry.name,
          path: relative,
        });
      }
    }

    return result;
  };

  try {
    const tree = walk(projectPath);
    res.json(tree);
  } catch (err) {
    console.error('❌ Failed to read project files:', err);
    res.status(500).json({ error: 'Failed to read project file tree' });
  }
});

export default router;