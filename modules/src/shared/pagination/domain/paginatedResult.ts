import { type PageSize } from './pagination'

export interface PaginatedResult<T> {
  data: T[]
  meta: {
    page: number
    pageSize: PageSize
    total: number
    count: number
  }
}
