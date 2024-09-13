export interface SuperheroFilters {
  name?: string
}

export function validateSuperheroFilters (payload: SuperheroFilters | undefined): SuperheroFilters {
 
  if (!payload || !payload.name) {return {}}

  if (typeof payload.name !== 'string') {
    throw new Error ('name should be a string')
  }

  return { name: payload.name }
}