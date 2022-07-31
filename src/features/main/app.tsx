import './app.css';

import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { BreedChecker, breedsSelector } from '../../features/breed-checker';
import { Gallery } from '../../features/gallery';

export const App: React.FC = () => {
  const breeds = useAppSelector(breedsSelector);

  return (
    <div className="App">
      <header className="App-header">
        <BreedChecker />

        {breeds.length > 0 ? <Gallery breeds={breeds} /> : null}
      </header>
    </div>
  );
};
