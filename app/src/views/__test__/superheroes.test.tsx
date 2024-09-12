import { render, screen, fireEvent, act } from '@testing-library/react';
import SuperheroesView from '../superheroesView';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';
import { superheroes } from '@marvelpedia/core';
import useInfiniteScroll from '@/app/useInfiniteScroll';

// Mock the necessary hooks and modules
vi.mock('@/app/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@marvelpedia/core', () => ({
  superheroes: {
    selectStatus: vi.fn(),
    selectMeta: vi.fn(),
    setFilter: vi.fn(),
    fetchAll: vi.fn(),
    incrementPage: vi.fn(),
  },
}));

vi.mock('@/app/useInfiniteScroll', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    loadMoreRef: { current: null },
    hasIntersect: false,
    setHasIntersect: vi.fn(),
  })),
}));

describe('SuperheroesView component', () => {
  const mockDispatch = vi.fn(() => ({
    unwrap: vi.fn()
  }))
  const mockSuperheroesMeta = { count: 5, total: 10 };

  beforeEach(() => {
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as Mock)
      .mockImplementation((selector) => {
        switch (selector) {
          case superheroes.selectStatus:
            return 'idle';
          case superheroes.selectMeta:
            return mockSuperheroesMeta;
          default:
            return [];
        }
      });
  });

  it('dispatches search action when a query is submitted', async () => {
    render(<SuperheroesView />);

    const searchInput = screen.getByPlaceholderText('Name of Character');

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'Spider-Man' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    })

    expect(mockDispatch).toHaveBeenCalledWith(superheroes.setFilter('Spider-Man'));
    expect(mockDispatch).toHaveBeenCalledWith(superheroes.fetchAll());
  });

  it('dispatches incrementPage when intersecting and enabled', () => {
    (useInfiniteScroll as unknown as Mock).mockReturnValueOnce({
      loadMoreRef: { current: null },
      hasIntersect: true,
      setHasIntersect: vi.fn(),
    });

    render(<SuperheroesView />);

    expect(mockDispatch).toHaveBeenCalledWith(superheroes.incrementPage());
  });
});
