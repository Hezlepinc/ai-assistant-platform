// server/models/QuickActionLog.js
import mongoose from 'mongoose';

const QuickActionLogSchema = new mongoose.Schema({
  actionName: { type: String },
  sessionId: { type: String },
  userId: { type: String },
  input: { type: String },
  result: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['success', 'fail'], default: 'success' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('QuickActionLog', QuickActionLogSchema);