import { configureStore } from '@reduxjs/toolkit'
import superheroReducer, {
  fetchAll,
  incrementPage,
  selectAll,
  selectMeta,
  selectStatus,
  setFilter
} from './superhero/presentation'
export * from './superhero/domain/superhero'

export const store = configureStore({
  reducer: {
    superheroes: superheroReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const superheroes = {
  fetchAll,
  incrementPage,
  setFilter,
  
  selectMeta,
  selectAll,
  selectStatus
}