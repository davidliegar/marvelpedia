import { env } from '@marvelpedia/config'
import { SuperheroRepository } from '../domain/superheroRepository'
import { fakeSuperheroRepositoryBuilder } from './fakeApi'
import { marvelSuperheroRepositoryBuilder } from './marvelApi'

import { httpService } from '../../shared/http/infrastructure'
import { authService } from '../../shared/auth/infrastructure'

export const superheroRepository: SuperheroRepository = (() => {
  if (env.DEV_MODE) {
    return fakeSuperheroRepositoryBuilder()
  } 
    return marvelSuperheroRepositoryBuilder({
      httpService,
      authService,
    })
  
})()
