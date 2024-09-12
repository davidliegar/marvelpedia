import { useAppSelector } from "@/app/reduxHooks"
import Superhero from "@/components/SuperHero"
import { superheroes } from "@marvelpedia/core"

export const SuperheroesList = () => {
  const superheroesSelector = useAppSelector(superheroes.selectAll)

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  return (
    <section className='grid grid-cols-3 gap-4'>
      {renderedHeroes}
    </section>
  )
}