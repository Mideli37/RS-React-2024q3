import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import pokemonDetailsMock from '../../tests/mocks/pokemon-details-mock.json';
import singlePokemonMock from '../../tests/mocks/single-pokemon-mock.json';
import { DetailsCard } from '../details-card';
import { PokemonCard } from '../pokemon-card';
import { DetailsSection } from './index';

describe('Details Card component', () => {
  it('Loading indicator is displayed while fetching data', async () => {
    const router = createMemoryRouter([
      {
        element: (
          <>
            <PokemonCard {...singlePokemonMock} />
            <Outlet />
          </>
        ),
        children: [{ path: 'details/:id', element: <DetailsSection /> }],
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const card = screen.getByRole('link');
    const user = userEvent.setup();
    await user.click(card);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
  });

  it('The detailed card component correctly displays the detailed card data', () => {
    const expectedName = pokemonDetailsMock.data.name;
    const expectedTypes = pokemonDetailsMock.data.types;

    const router = createMemoryRouter([
      {
        element: <DetailsCard {...pokemonDetailsMock.data} />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const nameHeading = screen.getByText(expectedName);
    expect(nameHeading).toBeVisible();
    expectedTypes.forEach((type) => {
      const typeElement = screen.getByText(type);
      expect(typeElement).toBeVisible();
    });
  });

  it('Clicking the close button hides the component', async () => {
    const router = createMemoryRouter([
      {
        element: (
          <>
            <PokemonCard {...singlePokemonMock} />
            <Outlet />
          </>
        ),
        children: [{ path: 'details/:id', element: <DetailsSection /> }],
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const card = await screen.findByRole('link');
    const user = userEvent.setup();
    await user.click(card);
    const detailsCard = await screen.findByTestId('details-card');
    expect(detailsCard).toBeVisible();
    const button = screen.getByRole('button');
    await user.click(button);
    expect(detailsCard).not.toBeVisible();
  });
});
