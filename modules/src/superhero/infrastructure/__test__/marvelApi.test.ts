import { describe, it, expect, vi } from 'vitest';
import { marvelSuperheroRepositoryBuilder } from '../marvelApi';
import { HttpService } from '../../../shared/http/domain/httpService';
import { Pagination } from '../../../shared/pagination/domain/pagination';
import { SuperheroFilters } from '../../domain/superheroFilters';

vi.mock('../../shared/auth/domain/authService', () => ({
  AuthService: {
    getToken: vi.fn()
  }
}));

vi.mock('../../shared/http/domain/httpService', () => ({
  HttpService: {
    get: vi.fn()
  }
}));

describe('marvelSuperheroRepositoryBuilder', () => {
  it('should call authService.getToken and httpService.get with correct parameters and parse the result correctly', async () => {
    const mockToken = 'mock-api-key';
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Superhero',
            description: 'A superhero',
            thumbnail: { path: 'http://example.com/image', extension: 'jpg' },
            urls: [{ type: 'detail', url: 'http://example.com/detail' }]
          }
        ],
        total: 1,
        count: 1
      }
    };

    const httpService = { get: vi.fn().mockResolvedValue(mockResponse) } as unknown as HttpService;
    const authService = { getToken: vi.fn().mockResolvedValue(mockToken) };
    
    const repository = marvelSuperheroRepositoryBuilder({ httpService, authService });

    const filters: SuperheroFilters = { name: 'value' };
    const pagination: Pagination = { page: 1, pageSize: 10 };

    const result = await repository.findAll(filters, pagination);

    expect(authService.getToken).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(
      `/v1/public/characters`,
      undefined,
      {
        params: {
          apikey: mockToken,
          ...filters,
          limit: pagination.pageSize,
          offset: (pagination.page - 1) * pagination.pageSize
        }
      }
    );

    expect(result).toEqual({
      data: [{
        id: '1',
        name: 'Superhero',
        description: 'A superhero',
        img: 'http://example.com/image/portrait_xlarge.jpg',
        externalLink: 'http://example.com/detail'
      }],
      meta: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: mockResponse.data.total,
        count: mockResponse.data.count
      }
    });
  });
});
