import { env } from '@marvelpedia/config'
import type { SuperheroRepository } from '../domain/superhero-repository';
import { type AuthService } from '../../shared/auth/domain/auth-service'
import { type HttpService } from '../../shared/http/domain/http-service'
import { MarvelGetAll } from './dto';
import { Pagination } from '../../shared/pagination/domain/pagination'
import { SuperheroFilters } from '../domain/superhero-filters'

export function marvelSuperheroRepositoryBuilder({
  httpService,
  authService
}: {
  httpService: HttpService
  authService: AuthService
}):  SuperheroRepository {
  return {
    async findAll(
      filters: SuperheroFilters,
      pagination: Pagination
    ) {
      const token = await authService.getToken()

      const params = {
        apikey: token,
        ...filters,
        limit: pagination.pageSize,
        offset: (pagination.page - 1) * pagination.pageSize
      }

      const superheroes = await httpService.get<MarvelGetAll>(`${env.API_URL}/v1/public/characters`, undefined, {
        params
      })
        
      const results = superheroes.data.results.map(hero => ({
        id: hero.id.toString(),
        name: hero.name,
        description: hero.description || '(No description available)',
        img: `${hero.thumbnail.path}/portrait_xlarge.${hero.thumbnail.extension}`,
        externalLink: hero.urls.find(item => item.type === 'detail')?.url
      }))

      return {
        data: results,
        meta: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: superheroes.data.total,
          count: superheroes.data.count
        }
      }
    },
  }
}