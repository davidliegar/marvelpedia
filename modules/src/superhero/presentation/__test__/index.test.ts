import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import superHeroesReducer, {
  fetchAll,
  incrementPage,
  selectError,
  selectFilters,
  selectMeta,
  selectPagination,
  selectStatus,
  setFilter
} from '../';
import { findAll } from '../../application/findAll';

vi.mock('../../application/findAll', () => ({
  findAll: vi.fn(),
}));

describe('superHeroesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { superheroes: superHeroesReducer } });
  });

  it('should handle incrementPage', () => {
    store.dispatch(incrementPage());
    const state = store.getState().superheroes;
    expect(state.pagination.page).toBe(1);
    expect(state.status).toBe('requesting');
  });

  it('should handle setFilter', () => {
    const filter = 'Spidy';
    store.dispatch(setFilter(filter));
    const state = store.getState().superheroes;
    expect(state.filters.name).toBe(filter);
    expect(state.pagination.page).toBe(1);
    expect(state.status).toBe('filtering');
  });

  it('should handle fetchAll pending', async () => {
    const mockFetchAll = vi.fn().mockResolvedValue({ data: [], meta: { count: 0, total: 0 } });
    (findAll as Mock).mockImplementation(mockFetchAll);

    store.dispatch(fetchAll());
    const state = store.getState().superheroes;
    expect(state.status).toBe('loading');
  });

  it('should handle fetchAll fulfilled', async () => {
    const mockResponse = {
      data: [{ id: '1', name: 'Hero', description: 'A hero', img: '', externalLink: '' }],
      meta: { count: 1, total: 1 },
    };

    (findAll as Mock).mockResolvedValue(mockResponse);

    await store.dispatch(fetchAll());
    const state = store.getState().superheroes;
    expect(state.status).toBe('succeeded');
    expect(state.meta.total).toBe(mockResponse.meta.total);
    expect(state.meta.count).toBe(mockResponse.meta.count);
    expect(state.entities[1]).toBe(mockResponse.data[0]);
  });

  it('should handle fetchAll rejected', async () => {
    (findAll as Mock).mockRejectedValue(new Error('Fetch failed'));

    await store.dispatch(fetchAll());
    const state = store.getState().superheroes;
    expect(state.status).toBe('rejected');
    expect(state.error).toBe('Fetch failed');
  });

  it('should return the correct values from selectors', () => {
    const state = store.getState();
    expect(selectStatus(state)).toBe(state.superheroes.status);
    expect(selectMeta(state)).toBe(state.superheroes.meta);
    expect(selectPagination(state)).toBe(state.superheroes.pagination);
    expect(selectFilters(state)).toBe(state.superheroes.filters);
    expect(selectError(state)).toBe(state.superheroes.error);
  });
});
