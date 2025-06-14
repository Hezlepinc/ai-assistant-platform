import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';     // Tailwind base styles
import './custom.css';    // Optional overrides

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);