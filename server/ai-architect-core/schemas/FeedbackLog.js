import mongoose from 'mongoose';

const FeedbackLogSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sessionId: { type: String, required: true },
  rating: { type: String, enum: ['up', 'down'], required: true },
  intent: { type: String, default: null },
  confidence: { type: Number, default: null },
  assistantName: { type: String, required: true },
  sourceModel: { type: String, enum: ['claude', 'gpt'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('FeedbackLog', FeedbackLogSchema);