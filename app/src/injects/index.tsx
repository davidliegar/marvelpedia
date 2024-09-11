import { provideSuperheroUseCases } from '@marvelpedia/core'
import { SuperheroContext } from './createContext'
import {type ReactNode, type FC } from 'react'

const CanvasUseCasesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SuperheroContext.Provider value={provideSuperheroUseCases()}>
    {children}
  </SuperheroContext.Provider>
}

const InjectProvider: FC<{ children: ReactNode }>  = ({ children }) => {
  return <CanvasUseCasesProvider>
    {children}
  </CanvasUseCasesProvider>
}

export default InjectProvider