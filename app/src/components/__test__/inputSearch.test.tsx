import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from '../inputSearch';
import { describe, it, expect, vi } from 'vitest';

describe('InputSearch component', () => {
  it('renders the input and button', () => {
    render(<InputSearch placeholder="Search..." onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('updates the input value when typing', () => {
    render(<InputSearch placeholder="Search..." onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement).toHaveValue('test');
  });

  it('calls onSearch with the correct query when button is clicked', () => {
    const handleSearch = vi.fn();
    render(<InputSearch placeholder="Search..." onSearch={handleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'test query' } });
    fireEvent.click(buttonElement);

    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('calls onSearch with the correct query when Enter is pressed', () => {
    const handleSearch = vi.fn();
    render(<InputSearch placeholder="Search..." onSearch={handleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'enter query' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(handleSearch).toHaveBeenCalledWith('enter query');
  });
});
