import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { NewFriend, Friend, FriendState, FriendResult } from './types'

import api from 'services/api'

const initialState: FriendState = {
  friends: [],
  errors: '',
  loading: false,
  updated: false
}

export const createFriend = createAsyncThunk(
  'friend/createFriend',
  async (friend: Required<NewFriend>, { rejectWithValue }) => {
    try {
      const response = await api.createFriend(friend)
      return response.data
    } catch (error) {
      const err = error as any
      throw rejectWithValue(err.response?.data)
    }
  }
)

export const getFriendByUserId = createAsyncThunk(
  'friend/getFriendByUserId',
  async (userId: number) => {
    try {
      const response = await api.getFriendByUserId(userId)
      return response.data
    } catch (error) {
      const err = error as any
      throw err.response?.data
    }
  }
)

export const updateFriend = createAsyncThunk(
  'friend/updateFriend',
  async (friend: Required<Friend>, { rejectWithValue }) => {
    try {
      const response = await api.updateFriend(friend)
    } catch (error) {
      const err = error as any
      throw rejectWithValue(err.response?.data)
    }
  }
)

export const deleteFriend = createAsyncThunk(
  'friend/deleteFriend',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.deleteFriend(id)
    } catch (error) {
      const err = error as any
      throw rejectWithValue(err.response?.data)
    }
  }
)

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder
      .addCase(createFriend.pending, (state) => {
        state.loading = true
      })
      .addCase(createFriend.fulfilled, (state, action) => {
        state.loading = false
        state.updated = true
      })
      .addCase(getFriendByUserId.pending, (state) => {
        state.loading = true
      })
      .addCase(getFriendByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.updated = false
        state.friends = action.payload.data.friends
      })
      .addCase(getFriendByUserId.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateFriend.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFriend.fulfilled, (state, action) => {
        state.loading = false
        state.updated = true
      })
      .addCase(updateFriend.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteFriend.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.updated = true
        state.loading = false
      })
      .addCase(deleteFriend.rejected, (state) => {
        state.loading = false
      })
  }
})

export default friendSlice.reducer
