import './loader.css';

import React from 'react';

import { LoaderIcon } from './loader-icon';

interface ILoaderProps {
  status: Status;
}

export const Loader: React.FC<ILoaderProps> = ({ status }) => (
  <div>
    {status === 'loading' ? (
      <div className="loading">
        <LoaderIcon />
        <div>Loading...</div>
      </div>
    ) : null}
    {status === 'failed' ? <div className="error">Failed!</div> : null}
  </div>
);
