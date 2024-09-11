import { Pagination, validatePagination } from '../../shared/pagination/domain/pagination'
import { SuperheroFilters, validateSuperheroFilters } from '../domain/superhero-filters'
import { superheroRepository } from '../infrastructure'

export interface findAllSuperheroInput {
  filters?: SuperheroFilters
  pagination: Pagination
}

export function findAll({ filters, pagination }: findAllSuperheroInput) {
  const filtersValidated = validateSuperheroFilters(filters)
  const paginationValidated = validatePagination(pagination)

  return superheroRepository.findAll(
    filtersValidated,
    paginationValidated
  )
}