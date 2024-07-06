import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './main.css';
import ErrorBoundary from './components/error-boundary';

const root = document.getElementById('root');

if (!root) {
  throw new Error('no root');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Error</h1>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
