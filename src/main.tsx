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
    <ErrorBoundary
      fallback={
        <div className="h-dvh flex justify-center items-center">
          <h1>Oops! Something went wrong. Try to reload page</h1>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
