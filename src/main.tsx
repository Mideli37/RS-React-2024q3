import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('no root');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
