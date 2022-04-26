import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { NewFriend, Friend, FriendsState, FriendsResult } from './types'

import api from 'services/api'

const initialState: FriendsState = {
  friends: { data: [] },
  friend: {
    data: {
      id: 0,
      friendname: '',
      email: '',
      gender: '',
      age: 0,
      hobbies: '',
      description: '',
      userId: 0
    }
  },
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

export const getFriends = createAsyncThunk('friend/getFriends', async () => {
  try {
    const response = await api.getFriends()
    return response.data
  } catch (error) {
    const err = error as any
    throw err.response?.data
  }
})

export const getFriendById = createAsyncThunk(
  'friend/getFriendById',
  async (id: number) => {
    try {
      const response = await api.getFriendById(id)
      return response.data
    } catch (error) {
      const err = error as any
      throw err.response?.data
    }
  }
)

export const getFriendByEmail = createAsyncThunk(
  'friend/getFriendByEmail',
  async (email: string) => {
    try {
      const response = await api.getFriendByEmail(email)
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
      return response.data
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
      return response.data
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
      .addCase(createFriend.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getFriends.pending, (state) => {
        state.loading = true
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false
        state.updated = false
        state.friends.data = action.payload.data.friends
      })
      .addCase(getFriends.rejected, (state) => {
        state.loading = false
      })

      .addCase(getFriendById.rejected, (state) => {
        state.loading = false
      })
      .addCase(getFriendById.pending, (state) => {
        state.loading = true
      })
      .addCase(getFriendById.fulfilled, (state, action) => {
        state.loading = false
        state.updated = false
        state.friend.data = action.payload.data.friend
      })

      .addCase(getFriendByEmail.rejected, (state) => {
        state.loading = false
      })
      .addCase(getFriendByEmail.pending, (state) => {
        state.loading = true
      })
      .addCase(getFriendByEmail.fulfilled, (state, action) => {
        state.loading = false
        state.updated = false
        state.friends.data = action.payload.data.friends
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
