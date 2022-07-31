import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import { App } from './app';

it('renders learn react link', () => {
  expect.assertions(2);
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText(/learn/iu)).toBeInTheDocument();
});
