import { createBrowserRouter } from 'react-router-dom' 
import SuperheroesView from '@/views/superheroesView'

const router = createBrowserRouter([
  { path: '/', element: <SuperheroesView /> }
])

export default router