import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User, UsersState } from './types'

import api from 'services/api'

const initialState: UsersState = {
  users: [],
  loading: false,
  updated: false
}

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (users: Required<User>, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(users)
      return response.data
    } catch (error) {
      console.log('error: ', error)
      const err = error as any
      throw rejectWithValue(err.response?.data)
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.updated = true
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
      })
  }
})

export default usersSlice.reducer
