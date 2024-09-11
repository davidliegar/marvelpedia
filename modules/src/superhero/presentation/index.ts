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
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  pagination: Pagination
  error: string | null
}

const superheroesAdapter = createEntityAdapter<Superhero>()

const initialState: SuperheroState = superheroesAdapter.getInitialState({
  status: 'idle',
  pagination: {
    page: 1,
    pageSize: 25
  },
  error: null
})

export const fetchAll = createAppAsyncThunk('superHeroes/fetchAll', async (payload: {
  filters?: SuperheroFilters
}, thunkApi) => {
  return await findAll({
    filters: payload.filters,
    pagination: selectPagination(thunkApi.getState())
  })
},{
  condition(_, thunkApi) {
    const status = selectStatus(thunkApi.getState())
    if (status !== 'idle') {
      return false
    }
  }
})

const superHeroesSlice = createSlice({
  name: 'superHeroes',
  initialState,
  reducers: {
    incrementPage(state) {
      console.log('increment')
      state.pagination.page += 1
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'succeeded'
        superheroesAdapter.addMany(state, action.payload.data)
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})

export default superHeroesSlice.reducer

export const { incrementPage } = superHeroesSlice.actions

export const selectStatus = (state: RootState) => state.superheroes.status
export const selectPagination = (state: RootState) => state.superheroes.pagination
export const selectError = (state: RootState) => state.superheroes.error

export const {
  selectAll
} = superheroesAdapter.getSelectors((state: RootState) => state.superheroes)