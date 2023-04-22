import { IElement } from '@/interfaces/editor'
import { createReducer } from '@reduxjs/toolkit'
import { setElements } from './actions'

export interface ElementsState {
  elements: IElement[]
}

const initialState: ElementsState = {
  elements: [],
}

export const elementsReducer = createReducer(initialState, builder => {
  builder.addCase(setElements, (state, { payload }) => {
    state.elements = payload
  })
})
