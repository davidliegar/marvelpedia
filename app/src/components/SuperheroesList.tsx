import { useAppSelector } from "@/app/reduxHooks"
import LoadingHero from "@/components/LoadingHero"
import Superhero from "@/components/SuperHero"
import { superheroes } from "@marvelpedia/core"
import noResultsImg from '@/assets/deadpool-ops.png';

const SuperheroesList = ({ loading = false }) => {
  const superheroesSelector = useAppSelector(superheroes.selectAll)

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  if (loading) {
    renderedHeroes.push(<LoadingHero key="loading" />)
  }

  const list = <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
    {renderedHeroes}
  </section>

  const empty = <div className="flex items-center flex-col w-full sm:w-52">
    <div className="masking">
      <img src={noResultsImg} alt="no result" />
    </div>
    <p className="text-center">Ops, we couldn't find your superhero, try with another name</p>
  </div>

  const isEmpty = superheroesSelector.length === 0

  return (
   isEmpty ? empty : list
  )
}

export default SuperheroesList