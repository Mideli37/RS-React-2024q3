import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { MainPage } from './main-page';

describe('Main page component', () => {
  it('component renders without errors', () => {
    expect(() => {
      const router = createMemoryRouter([
        {
          element: <MainPage />,
          path: '/',
        },
      ]);
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
});
