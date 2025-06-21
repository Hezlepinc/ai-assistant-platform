import mongoose from 'mongoose';

const AssistantLogSchema = new mongoose.Schema({
  assistantId: { type: String },
  sessionId: { type: String },
  modelUsed: { type: String },
  tokenUsage: { prompt: Number, completion: Number },
  fallbackUsed: { type: Boolean, default: false },
  success: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('AssistantLog', AssistantLogSchema);