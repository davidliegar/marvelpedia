import React from "react";
import { provideSuperheroUseCases } from '@marvelpedia/core';

type UsesCases<T extends () => unknown> = ReturnType<T>

function createContext<T>() {
  const context = React.createContext<T | undefined>(undefined);

  function useContext() {
      const ctx = React.useContext(context);
      if (!ctx) throw new Error("context must be inside a Provider with a value");
      return ctx;
  }

  return [context, useContext] as const;
}

export const [SuperheroContext, UseSuperheroContext] = createContext<UsesCases<typeof provideSuperheroUseCases>>();