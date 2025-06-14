import mongoose from 'mongoose';

const FeedbackLogSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sessionId: { type: String },
  rating: { type: String, enum: ['up', 'down'], required: true },
  intent: { type: String, default: 'unknown' },
  confidence: { type: Number, default: 0 },
  modelUsed: { type: String, default: 'unknown' },
  fallbackUsed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const FeedbackLog = mongoose.model('FeedbackLog', FeedbackLogSchema);
export default FeedbackLog;