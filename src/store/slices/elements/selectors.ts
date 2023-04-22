import { RootState } from '@store/rootReducer'

export const selectElements = (state: RootState) => state.editor.elements.elements
