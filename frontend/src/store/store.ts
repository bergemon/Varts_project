import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import authReducer from './slice/authSlice';
import { useMemo } from 'react';
import { vartsApi } from '@/service/vartsService';


let store: ReturnType<typeof makeStore> | undefined;

const initialState = {};


export function makeStore(preloadedState = initialState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      [vartsApi.reducerPath]: vartsApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vartsApi.middleware),
  });
}

export const initializeStore = (preloadedState: Partial<ReturnType<typeof makeStore>>) => {
  let _store = store ?? makeStore(preloadedState)

  if (preloadedState && store) {
    _store = makeStore({ ...store.getState(), ...preloadedState })
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState: Partial<ReturnType<typeof makeStore>>) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export type AppState = ReturnType<typeof makeStore>

export type AppDispatch = AppState['dispatch']

export type RootState = ReturnType<AppState['getState']>

export const wrapper = createWrapper<AppState>(makeStore, { debug: false })