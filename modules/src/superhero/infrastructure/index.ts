import { env } from '@marvelpedia/config'
import { SuperheroRepository } from '../domain/superhero-repository'
import { fakeSuperheroRepositoryBuilder } from './fake-api'
import { marvelSuperheroRepositoryBuilder } from './marvel-api'

import { httpService } from '../../shared/http/infrastructure'
import { authService } from '../../shared/auth/infrastructure'

export const superheroRepository: SuperheroRepository = (() => {
  if (env.DEV_MODE) {
    return fakeSuperheroRepositoryBuilder()
  } else {
    return marvelSuperheroRepositoryBuilder({
      httpService,
      authService,
    })
  }
})()
