export interface SuperheroFilters {
  name?: string
}

export function validateSuperheroFilters (payload: SuperheroFilters | undefined): SuperheroFilters {
 
  if (!payload) return {}

  if (payload.name !== 'string') {
    throw new Error ('name should be a string')
  }

  return { name: payload.name }
}