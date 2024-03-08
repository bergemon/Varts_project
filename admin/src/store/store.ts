import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import { vartsApi } from '@/service/vartsService';


export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      [vartsApi.reducerPath]: vartsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vartsApi.middleware),
  });
}

export type AppState = ReturnType<typeof makeStore>

export type AppDispatch = AppState['dispatch']

export type RootState = ReturnType<AppState['getState']>