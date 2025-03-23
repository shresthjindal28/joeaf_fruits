import React from 'react'
import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { reduxStore } from './redux/store.jsx'

// Add preload hints for critical resources
const addPreloadHints = () => {
  const preloads = [
    { href: '/fonts/main-font.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
    { href: '/critical.css', as: 'style' }
  ];

  preloads.forEach(attrs => {
    const link = document.createElement('link');
    link.rel = 'preload';
    Object.entries(attrs).forEach(([key, value]) => {
      link[key] = value;
    });
    document.head.appendChild(link);
  });
};

// Execute preload before rendering
addPreloadHints();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Wrap in startTransition to avoid blocking the UI during initial render
startTransition(() => {
  root.render(
    <StrictMode>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </StrictMode>
  );
});
