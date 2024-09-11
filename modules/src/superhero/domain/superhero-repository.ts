import type { Superhero } from "./superhero";

export interface SuperheroRepository {
  findAll(): Promise<Superhero[]>
}
