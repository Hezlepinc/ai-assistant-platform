// client/src/api/index.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject projectId into all requests
instance.interceptors.request.use(config => {
  const isGet = config.method === 'get';
  
  if (isGet) {
    config.params = {
      ...(config.params || {}),
      projectId: 'ai-assistant-platform',
    };
  } else {
    config.data = {
      ...(config.data || {}),
      projectId: 'ai-assistant-platform',
    };
  }

  return config;
}, error => Promise.reject(error));

export default instance;