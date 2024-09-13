import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../button'
import { describe, expect, it, vi } from 'vitest';

describe('Button component', () => {
  it('renders a button when "to" prop is not provided', () => {
    render(<Button className="custom-class" onClick={() => {}}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
  });

  it('renders a link when "to" prop is provided', () => {
    render(<Button className="custom-class" to="https://example.com">Visit</Button>);

    const linkElement = screen.getByRole('link', { name: /visit/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('fires the onClick event when the button is clicked', () => {
    const handleClick = vi.fn();
    render(<Button className="custom-class" onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire the onClick event when a link is clicked', () => {
    const handleClick = vi.fn();
    render(<Button className="custom-class" to="https://example.com" onClick={handleClick}>Visit</Button>);

    const linkElement = screen.getByRole('link', { name: /visit/i });

    fireEvent.click(linkElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});