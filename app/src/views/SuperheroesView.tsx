import SuperheroesList from '@/components/SuperheroesList.tsx'
import InputSearch from '../components/InputSearch'

import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { useEffect, useState } from 'react'
import useInfiniteScroll from '@/app/useInfiniteScroll'
import { superheroes } from '@marvelpedia/core'

function SuperheroesView() {
  const dispatch = useAppDispatch()

  const superheroesStatus = useAppSelector(superheroes.selectStatus)
  const superheroesMeta = useAppSelector(superheroes.selectMeta)
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
    if (hasIntersect && isEnabled) {
      dispatch(superheroes.incrementPage())
    } 
  }, [hasIntersect, dispatch, isEnabled])

  useEffect(() => {
    if (superheroesStatus === 'requesting') {
      dispatch(superheroes.fetchAll())
    }
  }, [superheroesStatus, dispatch])


  useEffect(() => {
    setIsEnabled(superheroesMeta.count !== superheroesMeta.total)
  }, [superheroesMeta])

  return (
    <>
      <div className='w-11/12 max-w-screen-lg mx-auto'>
        <header className='sticky top-0 bg-gray-200 py-4 lg:mt-20'>
          <h2 className='text-neutral-700 font-bold text-4xl mb-8'>Search your character</h2>
          <InputSearch
            className="w-full sm:w-2/3 lg:w-1/2"
            placeholder='Name of Character'
            onSearch={onSearch}
            disabled={superheroesStatus === 'loading'}
          />
        </header>

        {superheroesStatus === 'rejected'
          ? <p className="p-3 bg-red-700 text-white">Seems that is a problem with your api key</p>
          : <SuperheroesList loading={superheroesStatus === 'loading' || superheroesStatus === 'idle'}/>
        }
        <div ref={loadMoreRef} />
        <footer className='font-sm mt-24 mb-16 text-neutral-500'>
          Data provided by Marvel © {new Date().toLocaleDateString('en', { year: 'numeric' })} Marvel
        </footer>
       </div>
    </>
  )
}

export default SuperheroesView
