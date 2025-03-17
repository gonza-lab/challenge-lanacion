import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../components/App.server';

const container = document.getElementById('root');
if (container) {
  hydrateRoot(container, <App />);
}
