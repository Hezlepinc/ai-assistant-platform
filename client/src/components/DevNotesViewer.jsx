import React, { useEffect, useState } from 'react';
import './DevNotesViewer.css';
import axios from '../api'; // Uses your interceptor with baseURL

function DevNotesViewer() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/dev-notes', {
          params: { project: 'ai-assistant-platform' },
        });
        const data = Array.isArray(res.data) ? res.data : res.data.notes;
        setNotes(data || []);
      } catch (err) {
        console.error('❌ Failed to fetch DevNotes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="devnotes-viewer">
      <div className="devnotes-header">📘 DevNotes</div>
      {loading ? (
        <div className="devnotes-loading">Loading notes...</div>
      ) : (
        <div className="devnotes-scroll">
          {notes.map((note, i) => (
            <div key={i} className="devnote-card">
              <h4>{note.title}</h4>
              <p className="devnote-tags">{note.tags.join(', ')}</p>
              <pre className="devnote-body">{note.content}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DevNotesViewer;