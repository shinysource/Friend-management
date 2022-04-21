import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Credentials, SignInfo, AuthState, AuthResult } from './types'

import api from 'services/api'

const initialState: AuthState = {
  user: {
    id: 0,
    username: '',
    email: '',
    role: '',
    password: ''
  },
  errors: '',
  loading: false,
  verified: false,
  checked: false
}

export const verify = createAsyncThunk('auth/verify', async () => {
  try {
    const response = await api.verify()
    return response.data
  } catch (error) {
    const err = error as any
    throw err.response?.data
  }
})

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: Required<Credentials>) => {
    try {
      const response = await api.signup(credentials)
      return response.data
    } catch (error) {
      const err = error as any
      throw err.response?.data
    }
  }
)

export const signin = createAsyncThunk(
  'auth/signin',
  async (signinInfo: Required<SignInfo>, { rejectWithValue }) => {
    try {
      const response = await api.signin(signinInfo)
      return response.data
    } catch (error) {
      const err = error as any
      throw rejectWithValue(err.response?.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      localStorage.removeItem('token')
      state.user = initialState.user
      state.checked = false
      state.loading = false
      state.verified = false
    },
    setChecked: (state, action) => {
      state.checked = action.payload
    },
    setVerified: (state, action) => {
      state.verified = action.payload
    }
  },
  extraReducers(builder): void {
    builder
      .addCase(verify.pending, (state) => {
        state.loading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false
        state.checked = true
        state.verified = true
        const { data } = action.payload
        state.user = data.user
      })
      .addCase(verify.rejected, (state) => {
        state.loading = false
        state.checked = false
        state.verified = true
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
        state.verified = true
        const { data } = action.payload
        state.user = data.user
        localStorage.setItem('token', data.token)
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.verified = true
      })
      .addCase(signin.pending, (state) => {
        state.loading = true
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false
        const { data } = action.payload
        state.user = data.user
        state.checked = true
        localStorage.setItem('token', data.token)
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false
        state.checked = false
      })
  }
})

export const signout = authSlice.actions.signout
export const setChecked = authSlice.actions.setChecked
export const setVerified = authSlice.actions.setVerified

export default authSlice.reducer
