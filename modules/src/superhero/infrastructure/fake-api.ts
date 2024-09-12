import type { SuperheroRepository } from '../domain/superhero-repository';
import { Pagination } from '../../shared/pagination/domain/pagination'
import { SuperheroFilters } from '../domain/superhero-filters'

const mockHeroes = Array.from({ length: 10 }).map((_, index) => {
  return  {
    id: `${index}`,
    name: `super-hero-${index}`,
    description: `super-hero-description-${index}`,
    img: 'string',
    externalLink: 'string'
  }
})

export function fakeSuperheroRepositoryBuilder(): SuperheroRepository {
  return {
    findAll(
      _: SuperheroFilters,
      pagination: Pagination
    ) {
      return Promise.resolve({
        data: mockHeroes,
        meta: {
          count: mockHeroes.length,
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: mockHeroes.length
        }
      })
    },
  }
}