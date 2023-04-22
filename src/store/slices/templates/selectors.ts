import { RootState } from '@store/rootReducer'

export const selectTemplates = (state: RootState) => state.editor.templates.templates
