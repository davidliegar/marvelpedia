export type PageSize = 10 | 25 | 50

export interface Pagination {
  page: number
  pageSize: PageSize
}

export function validatePagination ({
  page,
  pageSize
}: {
  page: unknown
  pageSize: unknown
}): Pagination {
  if (page === undefined || page === null) {
    throw new Error('page is required')
  }

  if (typeof page !== 'number' || page <= 0) {
    throw new Error('page must be an integer gt 0')
  }

  if (pageSize === undefined || page === null) {
    throw new Error('page size is required')
  }

  if (typeof pageSize !== 'number' || ![10, 25, 50].includes(pageSize)) {
    throw new Error('page must be an integer gt 0')
  }

  return { page, pageSize } as Pagination
}