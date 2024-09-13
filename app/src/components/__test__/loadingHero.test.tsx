import { render, screen } from '@testing-library/react';
import LoadingHero from '../loadingHero';
import { describe, expect, it } from 'vitest';

describe('LoadingHero component', () => {
  it('renders the loading placeholder for the image', () => {
    render(<LoadingHero />);
    
    const skeleton = screen.getByTestId('loading')
    expect(skeleton).toBeInTheDocument();
  });
});
