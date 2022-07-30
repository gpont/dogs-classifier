import React, { useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { breedsSelector, imgSelector, loadFile } from './breed-checker-slice';

export const BreedChecker: React.FC = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(breedsSelector);
  const loadedImg = useAppSelector(imgSelector);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const onAddFile = useCallback(() => {
    if (
      fileRef.current?.files !== null &&
      fileRef.current?.files !== undefined &&
      fileRef.current.files.length > 0
    ) {
      dispatch(loadFile(fileRef.current.files[0]));
    }
  }, [fileRef.current]);

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onAddFile}
        ref={fileRef}
      />

      {loadedImg === null ? null : <img src={loadedImg} />}

      <ul>
        {breeds.map((breedName: string) => (
          <li key={breedName}>{breedName}</li>
        ))}
      </ul>
    </div>
  );
};
