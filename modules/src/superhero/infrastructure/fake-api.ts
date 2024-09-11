import type { SuperheroRepository } from '../domain/superhero-repository';

export function fakeSuperheroRepositoryBuilder(): SuperheroRepository {
  return {
    findAll() {
      return Promise.resolve([{
        id: '0',
        name: 'spiderman'
      }])
    },
  }
}