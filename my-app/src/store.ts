import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'components/user.reducer'

import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: userReducer
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
