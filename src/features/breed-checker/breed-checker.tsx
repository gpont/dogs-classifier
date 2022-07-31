import './breed-checker.css';

import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DragAndDrop, Loader } from '../../components';
import {
  breedsSelector,
  imgSelector,
  loadFile,
  statusSelector,
} from './slices';

export const BreedChecker: React.FC = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(breedsSelector);
  const loadedImg = useAppSelector(imgSelector);
  const status = useAppSelector(statusSelector);

  const onAddFile = useCallback((file: File) => dispatch(loadFile(file)), []);

  return (
    <div>
      <DragAndDrop onDropFile={onAddFile}>
        <Loader status={status} />
        {loadedImg === null ? null : (
          <img className="main-image" src={loadedImg} />
        )}
      </DragAndDrop>

      {breeds.length > 0 ? <div>Breed: {breeds?.[0]}</div> : null}
    </div>
  );
};
