import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ChatBubble.css';

function ChatBubble({ sender, text, isHtml, meta }) {
  const isUser = sender === 'user';
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = async (rating) => {
    if (feedbackGiven || sender !== 'ai') return;
    setFeedbackGiven(true);

    const payload = {
      message: text,
      sessionId: sessionStorage.getItem('sessionId'),
      rating,
      intent: meta?.intent || 'unknown',
      confidence: meta?.confidence ?? 0,
      modelUsed: meta?.assistant || 'unknown',
      fallbackUsed: meta?.assistant?.toLowerCase().includes('gpt') || false,
    };

    try {
      await fetch(import.meta.env.VITE_API_BASE_URL + '/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('❌ Feedback submission failed:', err);
    }
  };

  return (
    <div className="chat-bubble-container">
      <div className={`chat-bubble ${isUser ? 'user' : 'ai'}`} title={isUser ? 'You' : 'AI'}>
        {isHtml ? <span dangerouslySetInnerHTML={{ __html: text }} /> : text}
      </div>

      {import.meta.env.MODE !== 'production' && sender === 'ai' && meta && (
        <div className="chat-debug">
          <small>🤖 Assistant: {meta.assistant}</small><br />
          <small>🎯 Intent: {meta.intent}</small><br />
          <small>📊 Confidence: {meta.confidence?.toFixed(2)}</small>
        </div>
      )}

      {sender === 'ai' && !feedbackGiven && (
        <div className="thumb-buttons">
          <button onClick={() => handleFeedback('up')}>👍</button>
          <button onClick={() => handleFeedback('down')}>👎</button>
        </div>
      )}

      {feedbackGiven && <div className="thanks-note">Thanks for your feedback!</div>}
    </div>
  );
}

ChatBubble.propTypes = {
  sender: PropTypes.oneOf(['user', 'ai']).isRequired,
  text: PropTypes.string.isRequired,
  isHtml: PropTypes.bool,
  meta: PropTypes.object,
};

export default ChatBubble;