import { superheroes } from '@marvelpedia/core'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect } from 'react'

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
    <article className="post-excerpt" key={superheroe.name}>
      <h3>{superheroe.name}</h3>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedHeroes}
    </section>
  )
}