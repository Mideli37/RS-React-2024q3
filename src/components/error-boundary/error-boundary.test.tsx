import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorBoundary from '.';

describe('Error boundary component', () => {
  it('component renders without errors', () => {
    expect(() => {
      const router = createMemoryRouter([
        {
          element: <ErrorBoundary />,
          path: '/',
        },
      ]);
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
});
