import { findAll } from './superhero/application'
export * from './superhero/domain/superhero'

export function provideSuperheroUseCases() {
  return {
    findAll
  }
}