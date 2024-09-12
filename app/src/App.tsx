import { SuperheroesList } from '@/views/SuperheroesList.tsx'
import InputSearch from './components/InputSearch'

import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { useEffect, useState } from 'react'
import useInfiniteScroll from '@/app/useInfiniteScroll'
import { superheroes } from '@marvelpedia/core'

function App() {
  const dispatch = useAppDispatch()

  const superheroesStatus = useAppSelector(superheroes.selectStatus)
  const { loadMoreRef, hasIntersect, setHasIntersect } = useInfiniteScroll()
  const [isEnabled, setIsEnabled ] = useState(true)

  async function onSearch(query: string) {
    setIsEnabled(false)
    dispatch(superheroes.setFilter(query))
    await dispatch(superheroes.fetchAll()).unwrap()
    setHasIntersect(false)
    setIsEnabled(true)
  }

  useEffect(() => {
    console.log({hasIntersect, isEnabled })
    if (hasIntersect && isEnabled) {
      console.log('hasIntersect', hasIntersect)
      dispatch(superheroes.incrementPage())
    } 
  }, [hasIntersect, dispatch, isEnabled])

  useEffect(() => {
    if (superheroesStatus === 'requesting') {
      dispatch(superheroes.fetchAll())
    }
  }, [superheroesStatus, dispatch])

  return (
    <>
      <div className='max-w-screen-lg mx-auto'>
        <h2 className='text-neutral-700 font-bold text-4xl mt-24 mb-8'>Search your character</h2>
        <InputSearch className="mb-4" placeholder='Name of Character' onSearch={onSearch} />

        <SuperheroesList />
        <div ref={loadMoreRef}>
          {superheroesStatus === 'loading' && 'loading'}
        </div>

        <footer className='font-sm mt-24 mb-16 text-neutral-500'>
          Data provided by Marvel © {new Date().toLocaleDateString('en', { year: 'numeric' })} Marvel
        </footer>
       </div>
    </>
  )
}

export default App
