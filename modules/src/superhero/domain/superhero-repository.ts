import { Pagination, PaginatedResult } from "../../shared/pagination/domain";
import type { Superhero } from "./superhero";
import { SuperheroFilters } from "./superhero-filters";

export interface SuperheroRepository {
  findAll(
    filters: SuperheroFilters,
    pagination: Pagination
  ): Promise<PaginatedResult<Superhero>>
}
