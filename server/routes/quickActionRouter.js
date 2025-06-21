import express from 'express';
import handleQuickAction from '../controllers/handleQuickAction.js';

const router = express.Router();

router.post('/', handleQuickAction);

export default router;