import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';

// Wait for a small period to ensure search engines can see the prerendered content
const renderApp = () => {
  // Find the prerendered content element
  const prerenderedContent = document.getElementById('prerendered-content');
  
  ReactDOM.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // Hide prerendered content after React has rendered
  if (prerenderedContent) {
    prerenderedContent.style.display = 'none';
  }
};

// Use requestIdleCallback for better performance if available
if (window.requestIdleCallback) {
  window.requestIdleCallback(renderApp);
} else {
  // Small timeout for older browsers and to ensure search engines can process the static content
  setTimeout(renderApp, 100);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
