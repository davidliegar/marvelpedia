import { useAppSelector } from "@/app/reduxHooks"
import LoadingHero from "@/components/loadingHero"
import Superhero from "@/components/SuperHero"
import { superheroes } from "@marvelpedia/core"

export const SuperheroesList = ({ loading = false }) => {
  const superheroesSelector = useAppSelector(superheroes.selectAll)

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  if (loading) {
    renderedHeroes.push(<LoadingHero key="loading" />)
  }

  return (
    <section className='grid grid-cols-3 gap-4'>
      {renderedHeroes}
    </section>
  )
}