import React from 'react';

interface ILoaderProps {
  status: Status;
}

export const Loader: React.FC<ILoaderProps> = ({ status }) => (
  <div>
    {status === 'loading' ? <div>Loading...</div> : null}
    {status === 'success' ? <div>Success!</div> : null}
    {status === 'failed' ? <div>Failed!</div> : null}
  </div>
);
