import { Template } from '@/interfaces/editor'
import { createReducer, current } from '@reduxjs/toolkit'
import { setCreations, updateCreationsList } from './actions'

export interface CreationsState {
  creations: Template[]
}

const initialState: CreationsState = {
  creations: [],
}

export const creationsReducer = createReducer(initialState, builder => {
  builder.addCase(setCreations, (state, { payload }) => {
    state.creations = state.creations.length > 1 ? state.creations.concat(payload) : payload
  })
  builder.addCase(updateCreationsList, (state, { payload }) => {
    const currentState = current(state)
    const updatedCreations = currentState.creations.map(creation => {
      if (creation.id === payload.id) {
        return payload
      } else {
        return creation
      }
    })
    state.creations = updatedCreations
  })
})
