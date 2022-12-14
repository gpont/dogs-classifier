import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { App } from './features/main';

const CONTAINER_ID = '#root';

const container = document.querySelector(CONTAINER_ID);

if (container === null) {
  throw new Error(`Has no react root container! (id: ${CONTAINER_ID})`);
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
