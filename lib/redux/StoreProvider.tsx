'use client'
import { persistor, store } from '@/lib/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export const StoreProvider = ({children}: {children: React.ReactNode}) => {

  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
  ) 
}