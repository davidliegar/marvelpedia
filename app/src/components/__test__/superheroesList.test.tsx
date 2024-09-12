import { render, screen } from '@testing-library/react';
import SuperheroesList from '../SuperheroesList';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { useAppSelector } from '@/app/reduxHooks';

vi.mock('@/app/reduxHooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@marvelpedia/core', () => ({
  superheroes: {
    selectAll: vi.fn(),
  },
}));

describe('SuperheroesList component', () => {
  it('renders loading state when loading is true', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    
    render(<SuperheroesList loading={true} />);

    
    // Ensure the loading component is rendered
    const loadingHero = screen.getByTestId('loading');
    expect(loadingHero).toBeInTheDocument();
  });

  it('renders a list of superheroes when superheroesSelector has data', () => {
    const mockHeroes = [
      { id: 1, name: 'Iron Man', description: 'A billionaire hero', img: 'ironman.jpg', externalLink: 'https://example.com/ironman' },
      { id: 2, name: 'Thor', description: 'God of Thunder', img: 'thor.jpg', externalLink: 'https://example.com/thor' }
    ];

    (useAppSelector as unknown as Mock).mockReturnValue(mockHeroes);

    render(<SuperheroesList loading={false} />);

    // Ensure the list of superheroes is rendered
    const heroElements = screen.getAllByRole('article');
    expect(heroElements).toHaveLength(2);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('Thor')).toBeInTheDocument();
  });

  it('renders the empty state when no superheroes and not loading', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([]);

    render(<SuperheroesList loading={false} />);

    // Ensure the empty state message and image are rendered
    const emptyMessage = screen.getByText(/we couldn't find your superhero/i);
    const emptyImage = screen.getByAltText('no result');

    expect(emptyMessage).toBeInTheDocument();
    expect(emptyImage).toBeInTheDocument();
  });
});
