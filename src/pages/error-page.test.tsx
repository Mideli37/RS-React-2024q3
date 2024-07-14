import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';

describe('Error page component', () => {
  it('component renders without errors', () => {
    expect(() => {
      const router = createMemoryRouter([
        {
          element: <ErrorPage />,
          path: '/',
        },
      ]);
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
});
