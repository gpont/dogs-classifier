import { fireEvent, render } from '@testing-library/react';
import React, { useEffect, useRef } from 'react';

import { FileInput } from './file-input';

describe('file-input component', () => {
  it('should pass ref and fire change event', async () => {
    expect.assertions(1);

    const testFn = jest.fn();
    const testFile = new File([], 'test.txt');

    await new Promise<void>(resolve => {
      const Container = () => {
        const ref = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
          if (ref.current !== null) {
            fireEvent.change(ref.current, { target: { files: [testFile] } });

            resolve();
          }
        }, [ref.current]);

        return <FileInput ref={ref} onChange={testFn} />;
      };

      render(<Container />);
    });

    expect(testFn.mock.calls).toHaveLength(1);
  });
});
