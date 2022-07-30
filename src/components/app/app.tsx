import './app.css';

import React from 'react';

import { BreedChecker } from '../../features/breed-checker';

export const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <BreedChecker />
    </header>
  </div>
);
