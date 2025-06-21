import FeedbackLog from '../schemas/FeedbackLog.js';

/**
 * Save thumbs feedback to the database.
 * @param {Object} data
 * @param {String} data.message
 * @param {String} data.sessionId
 * @param {String} data.rating - 'up' or 'down'
 * @param {String} data.assistantName
 * @param {String} data.sourceModel - 'claude' or 'gpt'
 * @param {String} [data.intent]
 * @param {Number} [data.confidence]
 */
export async function logFeedback(data) {
  try {
    const feedback = new FeedbackLog(data);
    await feedback.save();
    console.log('👍 Feedback logged');
  } catch (error) {
    console.error('❌ Failed to log feedback:', error);
  }
}