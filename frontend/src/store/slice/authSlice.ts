import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthState = {
  token: string | null
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? window.localStorage.getItem('token') : null,
    user: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentialsNull: (state: AuthState) => {
      state.token = null;
      window.localStorage.setItem('token', '')
    },
  },
})

export const { setCredentials, setCredentialsNull, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.token
