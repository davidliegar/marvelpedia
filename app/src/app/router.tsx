import { createBrowserRouter } from 'react-router-dom' 
import SuperheroesView from '@/views/SuperheroesView'

const router = createBrowserRouter([
  { path: '/', element: <SuperheroesView /> }
])

export default router