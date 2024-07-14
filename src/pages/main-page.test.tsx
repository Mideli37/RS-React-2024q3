import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Search component', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('The component retrieves the value from the local storage upon mounting.', () => {
    localStorage.setItem('pokemonMideli37searchValue', 'test-search-value');
    const router = createMemoryRouter([
      {
        element: <MainPage />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toHaveValue(localStorage.getItem('pokemonMideli37searchValue'));
  });

  it('Сlicking the Search button saves the entered value to the local storage', async () => {
    const router = createMemoryRouter([
      {
        element: <MainPage />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const searchBar = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const user = userEvent.setup();
    await user.click(searchBar);
    await user.keyboard('testValue');
    await user.click(searchButton);
    expect(localStorage.getItem('pokemonMideli37searchValue')).toEqual('testValue');
  });
});
