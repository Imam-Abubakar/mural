import { configureStore, Action } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import { ThunkAction } from "redux-thunk"
import rootReducer, { RootState } from "./rootReducer"

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
