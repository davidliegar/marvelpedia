import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit"
import { findAll } from '../application/find-all'
import { Superhero, SuperheroFilters } from "../domain"
import { AppDispatch, RootState } from "../.."
import { Pagination } from "../../shared/pagination/domain"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

interface SuperheroState extends EntityState<Superhero, string> {
  status: 'idle' | 'requesting' | 'filtering' |'loading' | 'succeeded' | 'rejected'
  pagination: Pagination
  meta: {
    count: number,
    total: number
  }
  filters: SuperheroFilters
  error: string | null
}

const superheroesAdapter = createEntityAdapter<Superhero>()

const initialState: SuperheroState = superheroesAdapter.getInitialState({
  status: 'idle',
  pagination: {
    page: 0,
    pageSize: 25
  },
  meta: {
    count: -1,
    total: 0
  },
  filters: {},
  error: null
})

export const fetchAll = createAppAsyncThunk('superHeroes/fetchAll', async (_, thunkApi) => {
  return await findAll({
    filters: selectFilters(thunkApi.getState()),
    pagination: selectPagination(thunkApi.getState())
  })
},{
  condition(_, thunkApi) {
    const status = selectStatus(thunkApi.getState())
    if (['loading', 'succeeded', 'rejected'].includes(status)) {
      return false
    }
  }
})

const superHeroesSlice = createSlice({
  name: 'superHeroes',
  initialState,
  reducers: {
    incrementPage(state) {
      state.pagination.page += 1
      state.status = 'requesting'
    },

    setFilter(state, action: PayloadAction<string>) {
      superheroesAdapter.removeAll(state)
      state.pagination.page = 1
      state.filters.name = action.payload
      state.status = 'filtering'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meta.total = action.payload.meta.total
        state.meta.count = action.payload.meta.count

        superheroesAdapter.addMany(state, action.payload.data)
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})

export default superHeroesSlice.reducer

export const { incrementPage, setFilter } = superHeroesSlice.actions

export const selectStatus = (state: RootState) => state.superheroes.status
export const selectMeta = (state: RootState) => state.superheroes.meta
export const selectPagination = (state: RootState) => state.superheroes.pagination
export const selectFilters = (state: RootState) => state.superheroes.filters
export const selectError = (state: RootState) => state.superheroes.error

export const {
  selectAll
} = superheroesAdapter.getSelectors((state: RootState) => state.superheroes)