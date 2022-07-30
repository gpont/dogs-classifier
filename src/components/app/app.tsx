import './app.css';

import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { BreedChecker } from '../../features/breed-checker';
import { breedsSelector } from '../../features/breed-checker/breed-checker-slice';
import { Gallery } from '../../features/gallery';

export const App: React.FC = () => {
  const breeds = useAppSelector(breedsSelector);

  return (
    <div className="App">
      <header className="App-header">
        <BreedChecker />

        <Gallery breeds={breeds} />
      </header>
    </div>
  );
};
