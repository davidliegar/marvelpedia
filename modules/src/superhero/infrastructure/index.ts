import { env } from '@marvelpedia/config'
import { SuperheroRepository } from '../domain/superhero-repository'
import { fakeSuperheroRepositoryBuilder } from './fake-api'

export const superheroRepository: SuperheroRepository = (() => {
  if (env.DEV_MODE) {
    return fakeSuperheroRepositoryBuilder()
  } else {
    return fakeSuperheroRepositoryBuilder()
  }
})()
