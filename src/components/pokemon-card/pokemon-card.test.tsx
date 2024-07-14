import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { PokemonCard } from '.';
import singlePokemonMock from '../../tests/mocks/single-pokemon-mock.json';
import { DetailsSection } from '../details-section';

describe('Pokemon Card component', () => {
  it('The card component renders the relevant card data', () => {
    const expectedName = singlePokemonMock.name;
    const expectedImageSrc = singlePokemonMock.images.small;
    const expectedDescription = singlePokemonMock.flavorText || 'no additional text';
    const router = createMemoryRouter([
      {
        element: <PokemonCard {...singlePokemonMock} />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const card = screen.getByRole('link');
    const name = within(card).getByRole('heading');
    const image = within(card).getByRole('img');
    const description = within(card).getByRole('paragraph');

    expect(name).toHaveTextContent(expectedName);
    expect(description).toHaveTextContent(expectedDescription);
    expect(image).toHaveAttribute('src', expectedImageSrc);
  });

  it('Clicking on a card opens a detailed card component', async () => {
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
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
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
    const spyonFetch = vi.spyOn(window, 'fetch');
    expect(spyonFetch).not.toBeCalled();
    const user = userEvent.setup();
    await user.click(card);
    expect(spyonFetch).toBeCalledWith('https://api.pokemontcg.io/v2/cards/base3-3');
  });
});
