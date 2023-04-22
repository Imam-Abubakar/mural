import { Template } from '@/interfaces/editor'
import { createReducer } from '@reduxjs/toolkit'
import { setTemplates } from './actions'

export interface TemplatesState {
  templates: Template[]
}

const initialState: TemplatesState = {
  templates: [],
}

export const templatesReducer = createReducer(initialState, builder => {
  builder.addCase(setTemplates, (state, { payload }) => {
    state.templates = payload
  })
})
