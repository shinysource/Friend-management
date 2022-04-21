import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authReducer from 'store/auth'
import friendReducer from 'store/friend'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer
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
