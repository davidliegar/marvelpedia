import { superheroes } from '@marvelpedia/core'

import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { useEffect } from 'react'
import Superhero from '@/components/SuperHero'
import useInfiniteScroll from '@/app/useInfiniteScroll'

export const SuperheroesList = () => {
  const dispatch = useAppDispatch()
  const superheroesSelector = useAppSelector(superheroes.selectAll)
  const superheroesStatus = useAppSelector(superheroes.selectStatus)

  const { loadMoreRef, page } = useInfiniteScroll({
    loading: (superheroesStatus === 'pending' || superheroesStatus === 'idle') 
  })

  useEffect(() => {
    if (superheroesStatus === 'idle') {
      dispatch(superheroes.fetchAll({}))
    }
  }, [superheroesStatus, dispatch])

  useEffect(() => {
    if (page > 1) {
      console.log('page increment', page)
      dispatch(superheroes.incrementPage())
    }
  }, [dispatch, page])

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  return (
    <section className='grid grid-cols-3 gap-4'>
      {renderedHeroes}
      <div ref={loadMoreRef}>
        {superheroesStatus === 'pending' && 'loading'}
      </div>
    </section>
  )
}