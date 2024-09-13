import SuperheroesList from '@/components/superheroesList'
import InputSearch from '../../components/inputSearch'

import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { useEffect, useState } from 'react'
import useInfiniteScroll from '@/app/useInfiniteScroll'
import { superheroes } from '@marvelpedia/core'
import { StyledError, StyledFooter, StyledHeader, StyledSuperheroView, StyledTitle } from './styles'

function SuperheroesView() {
  const dispatch = useAppDispatch(),

   superheroesStatus = useAppSelector(superheroes.selectStatus),
   superheroesMeta = useAppSelector(superheroes.selectMeta),
   { loadMoreRef, hasIntersect, setHasIntersect } = useInfiniteScroll(),
   [isEnabled, setIsEnabled ] = useState(true)

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
    <StyledSuperheroView>
      <StyledHeader>
        <StyledTitle>Search your character</StyledTitle>
        <InputSearch
          placeholder='Name of Character'
          className='search-input'
          onSearch={onSearch}
          disabled={superheroesStatus === 'loading'}
        />
      </StyledHeader>

      {superheroesStatus === 'rejected'
        ? <StyledError>Seems that is a problem with your api key</StyledError>
        : <SuperheroesList loading={superheroesStatus === 'loading' || superheroesStatus === 'idle'}/>
      }
      <div ref={loadMoreRef} />
      <StyledFooter>
        Data provided by Marvel © {new Date().toLocaleDateString('en', { year: 'numeric' })} Marvel
      </StyledFooter>
    </StyledSuperheroView>
  )
}

export default SuperheroesView
