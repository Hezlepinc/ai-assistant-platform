import React, { useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';
import './Chatbot.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const existing = sessionStorage.getItem('sessionId');
    if (existing) {
      setSessionId(existing);
    } else {
      const newId = `web-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem('sessionId', newId);
      setSessionId(newId);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage, { sender: 'ai', text: 'Thinking...' }]);
    setInput('');
    setLoading(true);

    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

    try {
      const res = await fetch(`${baseURL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: sessionId,
        }),
      });

      const data = await res.json();
      const replyText = data?.response || 'I am not able to help you with that.';

      const debugMeta = {
        intent: data.intent,
        confidence: data.confidence,
        assistant: data.assistant,
      };

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: replyText, meta: debugMeta },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev.slice(0, -1), {
        sender: 'ai',
        text: 'Something went wrong. Please try again later.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="chat-title">AI Architect</div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            isHtml={msg.isHtml}
            meta={msg.meta}
          />
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSend} disabled={loading} className="chat-send-button">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;