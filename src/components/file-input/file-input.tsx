import './file-input.css';

import React, {
  ChangeEvent,
  forwardRef,
  MutableRefObject,
  useCallback,
} from 'react';

interface IFileInputProps {
  onChange: (file: File) => void;
}

export const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ onChange }, ref) => {
    const onAddFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if (
        event.target?.files !== null &&
        event.target.files.length > 0 &&
        event.target.files[0] !== null
      ) {
        onChange(event.target.files[0]);
      }
    }, []);

    return (
      <input
        className="file-container"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onAddFile}
        ref={(node: HTMLInputElement) => {
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
