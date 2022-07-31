import './file-input.css';

import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useRef,
} from 'react';

interface IFileInputProps {
  onChange: (file: File) => void;
}

export const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ onChange }, ref) => {
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
        className="file-container"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onAddFile}
        ref={(node: HTMLInputElement) => {
          fileRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== undefined) {
            (ref as MutableRefObject<HTMLInputElement>).current = node;
          }
        }}
      />
    );
  },
);
