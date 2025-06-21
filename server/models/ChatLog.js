// models/ChatLog.js
import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  meta: {
    intent: String,
    confidence: Number,
    assistant: String
  }
});

export default mongoose.model('ChatLog', chatLogSchema);