// Placeholder for api.jsconst API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const sendMessageToAssistant = async (message, sessionId) => {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  const data = await res.json();
  return data.response;
};