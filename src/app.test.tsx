import { render } from '@testing-library/react';
import { App } from './app';

describe('App component', () => {
  it('component renders without errors', () => {
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});
