import { configureStore } from '@reduxjs/toolkit'
import superheroeReducer, { fetchAll, incrementPage, selectAll, selectError, selectStatus } from './superhero/presentation'
export * from './superhero/domain/superhero'

export const store = configureStore({
  reducer: {
    superheroes: superheroeReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const superheroes = {
  fetchAll,
  incrementPage,

  selectAll,
  selectError,
  selectStatus
}