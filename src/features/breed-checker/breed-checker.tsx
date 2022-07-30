import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DragAndDrop } from '../../components/drag-and-drop';
import { FileInput } from '../../components/file-input';
import { Loader } from '../../components/loader';
import {
  breedsSelector,
  imgSelector,
  loadFile,
  statusSelector,
} from './breed-checker-slice';

export const BreedChecker: React.FC = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(breedsSelector);
  const loadedImg = useAppSelector(imgSelector);
  const status = useAppSelector(statusSelector);

  const onAddFile = useCallback((file: File) => dispatch(loadFile(file)), []);

  return (
    <div>
      <FileInput onChange={onAddFile} />
      <DragAndDrop onDropFile={onAddFile} />
      <Loader status={status} />

      {loadedImg === null ? null : <img src={loadedImg} />}

      <ul>
        {breeds.map((breedName: string) => (
          <li key={breedName}>{breedName}</li>
        ))}
      </ul>
    </div>
  );
};
