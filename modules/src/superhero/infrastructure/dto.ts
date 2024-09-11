interface Hero {
  id: number
  name: string
  description: string
}

export interface MarvelGetAll {
  code: number
  data: {
    count: number,
    limit: number,
    offset: number,
    results: Hero[]
    total: number
  }
}