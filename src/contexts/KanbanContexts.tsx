import React, { createContext, useContext } from 'react'
import { IKanbanBoard } from '../data/KanbanDefinitions'
import { StateAction } from '../actions/KanbanActions'

export const StateContext = createContext<IKanbanBoard | null>(null)
export const StateDispatchContext = createContext<React.Dispatch<StateAction> | null>(null)

export const useStateContext = () => {
  const stateContext = useContext(StateContext)

  if (!stateContext) {
    throw new Error('stateContext has to be used within <StateContext.Provider>')
  }

  return stateContext
}

export const useStateDispatchContext = () => {
  const stateDispatchContext = useContext(StateDispatchContext)

  if (!stateDispatchContext) {
    throw new Error('stateDispatchContext has to be used within <StateDispatchContext.Provider>')
  }

  return stateDispatchContext
}
