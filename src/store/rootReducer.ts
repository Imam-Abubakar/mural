import { combineReducers } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { elementsReducer, ElementsState } from './slices/elements/reducer'
import { uploadsReducer } from './slices/uploads/reducer'
import { PersistConfig } from 'redux-persist/es/types'
import { fontsReducer } from './slices/fonts/reducer'
import { templatesReducer } from './slices/templates/reducer'
import { creationsReducer } from './slices/creations/reducer'
// import { authReducer } from "@store/slices/auth/reducer"
// import { AuthState } from "./slices/auth/reducer"
// import { occasionsReducer } from "./slices/occasions/reducer"
// import { detailsReducer, DetailsState } from "./slices/details/reducer"
// import { feedbackReducer } from "./slices/feedback/reducer"

// const authPersistConfig: PersistConfig<AuthState> = {
//   key: "auth",
//   storage,
//   blacklist: ["errors", "passwordChageStatus"],
// }

const elementsPersistConfig: PersistConfig<ElementsState> = {
  key: 'elements',
  storage,
}

const rootReducer = combineReducers({
  editor: combineReducers({
    elements: persistReducer(elementsPersistConfig, elementsReducer),
    uploads: uploadsReducer,
    fonts: fontsReducer,
    templates: templatesReducer,
  }),
  creations: creationsReducer,
  // auth: persistReducer(authPersistConfig, authReducer),
  // occassions: occasionsReducer,
  // details: persistReducer(detailsPersistConfig, detailsReducer),
  // feedback: feedbackReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
