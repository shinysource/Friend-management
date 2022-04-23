import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authReducer from 'store/auth'
import friendReducer from 'store/friend'
import userReducer from 'store/user'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
