import React, { useEffect, useState } from 'react';
import axios from '../api';
import QuickActionsDropdown from './QuickActionsDropdown.jsx';

function ChatSessionSidebar({ activeSessionId, onSelect, isCollapsed, setIsCollapsed }) {
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get('/sessions');
      setSessions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const createSession = async () => {
    if (!newSessionName.trim()) return;
    try {
      const res = await axios.post('/sessions', { name: newSessionName });
      fetchSessions();
      setNewSessionName('');
      onSelect(res.data._id);
    } catch (err) {
      console.error('Error creating session:', err);
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm('Delete this session?')) return;
    try {
      await axios.delete(`/sessions/${id}`);
      if (id === activeSessionId) onSelect(null);
      fetchSessions();
    } catch (err) {
      console.error('Error deleting session:', err);
    }
  };

  return (
    <div
      style={{
        width: isCollapsed ? 56 : 240,
        minWidth: isCollapsed ? 56 : 240,
        padding: isCollapsed ? '8px 4px' : '12px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        boxSizing: 'border-box',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Collapse Button */}
      <div style={{ width: '100%', maxWidth: 180, marginBottom: '10px' }}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            width: '100%',
            backgroundColor: '#004aad',
            color: 'white',
            border: 'none',
            padding: '4px 0',
            fontSize: '0.85rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isCollapsed ? '☰' : '⇤ Collapse'}
        </button>
      </div>

      {/* Quick Actions Dropdown */}
      {!isCollapsed && (
        <div style={{ width: '100%', maxWidth: 180, marginBottom: '16px' }}>
          <QuickActionsDropdown />
        </div>
      )}

      {/* Session List */}
      {!isCollapsed && (
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>💬 Sessions</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {sessions.map((s) => (
              <li
                key={s._id}
                onClick={() => onSelect(s._id)}
                style={{
                  backgroundColor: s._id === activeSessionId ? '#004aad' : '#e0e0e0',
                  color: s._id === activeSessionId ? 'white' : 'black',
                  padding: '6px',
                  borderRadius: '6px',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{s.name || 'Unnamed Session'}</strong>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(s._id);
                    }}
                    style={{
                      marginLeft: 8,
                      background: 'transparent',
                      border: 'none',
                      color: s._id === activeSessionId ? 'white' : 'black',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    ✕
                  </button>
                </div>
                <small style={{ opacity: 0.6, marginTop: 2 }}>
                  🕒 {new Date(s.createdAt || s.updatedAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>

          {/* New Session Input */}
          <div style={{ width: '100%', maxWidth: 180, marginTop: 8 }}>
            <input
              placeholder="New session"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              style={{
                width: '100%',
                padding: '4px 6px',
                borderRadius: '4px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                fontSize: '0.85rem',
              }}
            />
            <button
              onClick={createSession}
              style={{
                marginTop: '6px',
                padding: '6px',
                width: '100%',
                backgroundColor: '#004aad',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.85rem',
              }}
            >
              ➕ Create
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Mode Icons */}
      {isCollapsed && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {sessions.map((s) => (
            <li
              key={s._id}
              onClick={() => onSelect(s._id)}
              title={s.name}
              style={{
                backgroundColor: s._id === activeSessionId ? '#004aad' : '#e0e0e0',
                color: s._id === activeSessionId ? 'white' : 'black',
                padding: '6px',
                borderRadius: '4px',
                marginBottom: '4px',
                cursor: 'pointer',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.85rem',
              }}
            >
              💬
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatSessionSidebar;