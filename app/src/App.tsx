import { SuperheroesList } from '@/views/SuperheroesList.tsx'
import InputSearch from './components/InputSearch'

import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { useEffect } from 'react'
import useInfiniteScroll from '@/app/useInfiniteScroll'
import { superheroes } from '@marvelpedia/core'

function App() {
  const dispatch = useAppDispatch()

  const superheroesStatus = useAppSelector(superheroes.selectStatus)
  const metaSelector = useAppSelector(superheroes.selectMeta)

  const { loadMoreRef, hasIntersect } = useInfiniteScroll()

  useEffect(() => {
    if (hasIntersect) {
      console.log('increment')
      dispatch(superheroes.incrementPage())
    } 
  }, [hasIntersect, dispatch])

  function onSearch(query: string) {
    dispatch(superheroes.setFilter(query))
  }

  useEffect(() => {
    if (superheroesStatus === 'requesting') {
      dispatch(superheroes.fetchAll())
    }
  }, [superheroesStatus, dispatch, metaSelector])

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
