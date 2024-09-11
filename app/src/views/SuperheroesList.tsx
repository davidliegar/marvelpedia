import { superheroes } from '@marvelpedia/core'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect } from 'react'
import Superhero from '@/components/SuperHero'

export const SuperheroesList = () => {
  const dispatch = useAppDispatch()
  const superheroesSelector = useAppSelector(superheroes.selectAll)
  const superheroesStatus = useAppSelector(superheroes.selectStatus)

  useEffect(() => {
    if (superheroesStatus === 'idle') {
      dispatch(superheroes.fetchAll())
    }
  }, [superheroesStatus, dispatch])

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  return (
    <section className='grid grid-cols-3 gap-4'>
      {renderedHeroes}
    </section>
  )
}