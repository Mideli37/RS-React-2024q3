import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import pokemonResponseMock from '../../tests/mocks/pokemon-info-mock.json';
import { CardList } from './card-list';

describe('Card List component', () => {
  it('The component renders the specified number of cards', () => {
    const expectedCount = pokemonResponseMock.count;
    const router = createMemoryRouter([
      {
        element: <CardList data={pokemonResponseMock.data} />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const cardList = screen.getByRole('list');
    const count = cardList.childElementCount;
    expect(count).toBe(expectedCount);
  });
  it('An appropriate message is displayed if no cards are present', () => {
    const expectedMessage = /No cards were found/i;
    const router = createMemoryRouter([
      {
        element: <CardList data={[]} />,
        path: '/',
      },
    ]);
    render(<RouterProvider router={router} />);
    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toHaveTextContent(expectedMessage);
  });
});
