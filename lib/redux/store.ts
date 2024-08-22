"use client"

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'
import mainReducer from '@/lib/redux/slices/mainSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  main: mainReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const selectMainState = (state: RootState) => state.main
