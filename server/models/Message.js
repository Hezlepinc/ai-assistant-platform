import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  sender: { type: String, enum: ['user', 'assistant'], required: true },
  text: { type: String, required: true },
  modelUsed: { type: String },
  intent: { type: String },
  tags: [String],
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);