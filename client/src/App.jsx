import React, { useState } from 'react';
import ChatBot from './components/ChatBot';
import ChatSessionSidebar from './components/ChatSessionSidebar';
import DevNotesPanel from './components/DevNotesViewer';
import './App.css';

function App() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <ChatSessionSidebar
        activeSessionId={activeSessionId}
        onSelect={setActiveSessionId}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Chat Column */}
      <div
        style={{
          flexGrow: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Chat Area */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          <ChatBot sessionId={activeSessionId} />
        </div>
      </div>

      {/* DevNotes Panel */}
      <div style={{ width: 400, borderLeft: '1px solid #ccc' }}>
        <DevNotesPanel />
      </div>
    </div>
  );
}

export default App;