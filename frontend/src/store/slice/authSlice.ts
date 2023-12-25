import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthState = {
  access: string | null
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: typeof window !== 'undefined' ? window.localStorage.getItem('access') : null,
    user: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { access } }: PayloadAction<{ access: string }>) => {
      state.access = access
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentialsNull: (state: AuthState) => {
      state.access = null;
      window.localStorage.setItem('access', '')
    },
  },
})

export const { setCredentials, setCredentialsNull, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.access
