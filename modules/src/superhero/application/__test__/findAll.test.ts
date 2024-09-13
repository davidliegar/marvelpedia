import { describe, expect, it, vi } from 'vitest'
import { findAll } from '../findAll'
import * as paginationDomain from '../../../shared/pagination/domain/pagination'
import * as filtersDomain from '../../domain/superheroFilters'
import { superheroRepository } from '../../infrastructure'

describe('findAll function', () => {
  it('should validate filters and pagination, and call superheroRepository.findAll', () => {
    const filters = { name: 'value' },
     pagination = { page: 1, pageSize: 10 } as const,

     spyFilters = vi.spyOn(filtersDomain, 'validateSuperheroFilters'),
     spyPagination = vi.spyOn(paginationDomain, 'validatePagination'),
     spyFindAll = vi.spyOn(superheroRepository, 'findAll')

    findAll({ filters, pagination });

    expect(spyFilters).toHaveBeenCalledWith(filters);
    expect(spyPagination).toHaveBeenCalledWith(pagination);
    expect(spyFindAll).toHaveBeenCalledWith(filters, pagination);
  });
});
