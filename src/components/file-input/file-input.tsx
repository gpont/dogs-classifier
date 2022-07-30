import React, { useCallback, useRef } from 'react';

interface IFileInputProps {
  onChange: (file: File) => void;
}

export const FileInput: React.FC<IFileInputProps> = ({ onChange }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onAddFile = useCallback(() => {
    if (
      fileRef.current?.files !== null &&
      fileRef.current?.files !== undefined &&
      fileRef.current.files.length > 0 &&
      fileRef.current.files[0] !== null
    ) {
      onChange(fileRef.current.files[0]);
    }
  }, [fileRef.current]);

  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={onAddFile}
      ref={fileRef}
    />
  );
};
