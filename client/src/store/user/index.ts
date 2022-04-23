import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User, UsersState } from './types'

import api from 'services/api'

const initialState: UsersState = {
  users: [],
  loading: false,
  updated: false
}

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  try {
    const response = await api.getUsers()
    return response.data
  } catch (error) {
    const err = error as any
    throw err.response?.data
  }
})

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

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id)
      return response.data
    } catch (error) {
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
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.updated = false
        state.users = action.payload.data.users
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false
      })

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
