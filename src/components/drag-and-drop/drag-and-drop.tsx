import './drag-and-drop.css';

import React, { DragEvent, useCallback, useRef } from 'react';

import { FileInput } from '../file-input';

interface IDragAndDropProps {
  onDropFile: (file: File) => void;
  children?: React.ReactNode | null;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  onDropFile,
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (
      event.dataTransfer !== null &&
      event.dataTransfer.items.length > 0 &&
      event.dataTransfer.items[0].kind === 'file'
    ) {
      const file = event.dataTransfer.items[0].getAsFile();

      if (file !== null) {
        onDropFile(file);
      }
    }
  }, []);

  const preventDefault = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const onClick = useCallback(() => fileInputRef.current?.click(), [
    fileInputRef.current,
  ]);

  return (
    <div
      onDrop={onDrop}
      onDragEnter={preventDefault}
      onDragOver={preventDefault}
      onClick={onClick}
      className="drag-container"
    >
      <p>
        Drag one file to this <i>drop zone</i> or click for selecting file.
      </p>

      <FileInput ref={fileInputRef} onChange={onDropFile} />

      {children}
    </div>
  );
};
