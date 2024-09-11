import { env } from '@marvelpedia/config'
import type { SuperheroRepository } from '../domain/superhero-repository';
import { type AuthService } from '../../shared/auth/domain/auth-service'
import { type HttpService } from '../../shared/http/domain/http-service'
import { MarvelGetAll } from './dto';

export function marvelSuperheroRepositoryBuilder({
  httpService,
  authService
}: {
  httpService: HttpService
  authService: AuthService
}):  SuperheroRepository {
  return {
    async findAll () {
      const token = await authService.getToken()
      const superheroes = await httpService.get<MarvelGetAll>(`${env.API_URL}/v1/public/characters`, undefined, {
        params: {
          apikey: token
        }
      })
        
      return superheroes.data.results.map(hero => ({
        id: hero.id.toString(),
        name: hero.name,
        description: hero.description || '(No description available)',
        img: `${hero.thumbnail.path}/portrait_xlarge.${hero.thumbnail.extension}`
      }))
    },
  }
}