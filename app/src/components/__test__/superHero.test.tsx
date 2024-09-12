import { render, screen } from '@testing-library/react';
import Superhero from '../superhero';
import { describe, it, expect } from 'vitest';

// Mock superhero data
const mockHero = {
  id: '1',
  name: 'Spider-Man',
  description: 'description',
  img: 'https://example.com/spiderman.jpg',
  externalLink: 'https://marvel.com/spiderman'
};

describe('Superhero component', () => {
  it('renders the hero image, name, and description', () => {
    render(<Superhero hero={mockHero} />);

    const imgElement = screen.getByAltText('Spider-Man');
    const nameElement = screen.getByText('Spider-Man');
    const descriptionElement = screen.getByText(/description/i);
    const buttonElement = screen.getByRole('link', { name: /read more/i });

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockHero.img);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', mockHero.externalLink);

  });
});
