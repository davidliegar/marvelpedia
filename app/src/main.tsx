import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@marvelpedia/core'

import { RouterProvider } from 'react-router-dom'
import router from './app/router.tsx'

import './styles/index.css'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/> 
      </Provider>
    </StrictMode>,
  )  
}