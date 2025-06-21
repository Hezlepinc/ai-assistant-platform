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

  const tooltipText =
    sender === 'ai' && meta
      ? `🎯 ${meta.intent} | 🤖 ${meta.assistant} | 📊 ${(meta.confidence * 100).toFixed(1)}%`
      : isUser
      ? 'You'
      : '';

  const renderText = () => {
    if (isHtml) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }

    const codeRegex = /```(?:[a-z]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = codeRegex.exec(text)) !== null) {
      const beforeCode = text.slice(lastIndex, match.index);
      const code = match[1];

      if (beforeCode.trim()) {
        parts.push(<p key={`text-${key++}`}>{beforeCode}</p>);
      }

      parts.push(
        <div className="code-block-container" key={`code-${key++}`}>
          <pre><code>{code}</code></pre>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            📋 Copy
          </button>
        </div>
      );

      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(<p key={`text-${key++}`}>{text.slice(lastIndex)}</p>);
    }

    return parts;
  };

  return (
    <div className="chat-bubble-container">
      <div
        className={`chat-bubble ${isUser ? 'user' : 'ai'}`}
        title={tooltipText}
      >
        {renderText()}
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