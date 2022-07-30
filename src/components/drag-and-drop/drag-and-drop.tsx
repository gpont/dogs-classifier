import React, { DragEvent, useCallback } from 'react';

interface IDragAndDropProps {
  onDropFile: (file: File) => void;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({ onDropFile }) => {
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

  const onDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return (
    <div
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      style={{ border: '3px solid black' }}
    >
      <p>
        Drag one file to this <i>drop zone</i>.
      </p>
    </div>
  );
};
