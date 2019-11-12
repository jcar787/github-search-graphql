import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const renderWithRedux = ui => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
};

it('can render without crashing with redux', () => {
  const renderedObj = renderWithRedux(<App />);
  expect(renderedObj).toHaveProperty('store');
  expect(renderedObj).toHaveProperty('container');
});
