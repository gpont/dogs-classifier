import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { DragAndDrop } from './drag-and-drop';

describe('dragAndDrop component', () => {
  it('should render', () => {
    expect.assertions(1);
    const { getByText } = render(<DragAndDrop onDropFile={() => {}} />);

    expect(getByText(/Drag one file to this/iu)).toBeInTheDocument();
  });

  it('should handle drag and drop', () => {
    expect.assertions(1);
    const mockFn = jest.fn();
    const { getByText } = render(<DragAndDrop onDropFile={mockFn} />);

    const mockFile = new File([], 'name.txt');

    fireEvent.drop(getByText(/Drag one file to this/iu), {
      dataTransfer: {
        items: [{ getAsFile: () => mockFile, kind: 'file' }],
      },
    });

    expect(mockFn.mock.calls[0][0]).toBe(mockFile);
  });
});
