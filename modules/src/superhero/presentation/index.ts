import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit"
import { findAll } from '../application/find-all'
import { Superhero } from "../domain/superhero"
import { AppDispatch, RootState } from "../.."

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

interface SuperheroState extends EntityState<Superhero, string> {
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  error: string | null
}

const superheroesAdapter = createEntityAdapter<Superhero>()

const initialState: SuperheroState = superheroesAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const fetchAll = createAppAsyncThunk('superHeroes/fetchAll', async () => {
  return await findAll()
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'succeeded'
        superheroesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})

export default superHeroesSlice.reducer

export const selectStatus = (state: RootState) => state.superheroes.status
export const selectError = (state: RootState) => state.superheroes.error

export const {
  selectAll
} = superheroesAdapter.getSelectors((state: RootState) => state.superheroes)