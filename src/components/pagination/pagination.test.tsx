import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Pagination } from '.';

function getRouter(
  componentProps: Omit<ComponentProps<typeof Pagination>, 'setPage'>
): ReturnType<typeof createMemoryRouter> {
  return createMemoryRouter([
    {
      element: (
        <Pagination
          {...componentProps}
          setPage={vi.fn()}
        />
      ),
      path: '/',
    },
  ]);
}

describe('Pagination component', () => {
  it('component renders with first page without errors', () => {
    expect(() => {
      const router = getRouter({ curPage: 1, pageSize: 10, totalCardCount: 100 });
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
  it('component renders with third page without errors', () => {
    expect(() => {
      const router = getRouter({ curPage: 3, pageSize: 10, totalCardCount: 100 });
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
  it('component renders with seventh page without errors', () => {
    expect(() => {
      const router = getRouter({ curPage: 7, pageSize: 10, totalCardCount: 100 });
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
});
