import { Pagination, validatePagination } from '../../shared/pagination/domain/pagination'
import { SuperheroFilters, validateSuperheroFilters } from '../domain/superheroFilters'
import { superheroRepository } from '../infrastructure'
import { analyticsService } from '../../shared/anaylitics'

export interface findAllSuperheroInput {
  filters?: SuperheroFilters
  pagination: Pagination
}

export function findAll({ filters, pagination }: findAllSuperheroInput) {
  const filtersValidated = validateSuperheroFilters(filters),
   paginationValidated = validatePagination(pagination)

  if (filtersValidated.name) {
    analyticsService.track({
      type: 'action_search_superhero',
      payload: {
        name: 'filtersValidated.name'
      }
    })
  }

  return superheroRepository.findAll(
    filtersValidated,
    paginationValidated
  )
}