import { describe, expect, it, vi } from 'vitest';
import { marvelAuthServiceBuilder } from '../marvelAuthService.ts';

vi.mock('@marvelpedia/config', () => ({
  env: {
    API_KEY: 'mock-api-key'
  }
}));

describe('marvelAuthServiceBuilder', () => {
  it('should return an AuthService object with a getToken method', async () => {
    const authService = marvelAuthServiceBuilder();
    
    expect(authService).toHaveProperty('getToken');

    const token = await authService.getToken();
    expect(token).toBe('mock-api-key');
  })
})