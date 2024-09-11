interface Hero {
  id: number
  name: string
  description?: string
  thumbnail: {
    extension: string
    path: string
  }
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