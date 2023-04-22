import { RootState } from '@store/rootReducer'

export const selectCreations = (state: RootState) => state.creations.creations
