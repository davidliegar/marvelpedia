import { superheroRepository } from '../infrastructure'

export function findAll() {
  return superheroRepository.findAll()
}