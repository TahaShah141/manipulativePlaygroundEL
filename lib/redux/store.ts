"use client"

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'
import baseTenReducer from '@/lib/redux/slices/BaseTenSlice'
import fractionReducer from '@/lib/redux/slices/FractionSlice'
import geoboardReducer from '@/lib/redux/slices/GeoboardSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  baseten: baseTenReducer,
  fraction: fractionReducer,
  geoboard: geoboardReducer
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

export const selectBaseTenState = (state: RootState) => state.baseten
export const selectFractionState = (state: RootState) => state.fraction
export const selectGeoboardState = (state: RootState) => state.geoboard