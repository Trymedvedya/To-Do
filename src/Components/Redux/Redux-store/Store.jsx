import { configureStore } from '@reduxjs/toolkit'
import visibleReducer from '../Redux-slices/visibleSlice'
export const Store = configureStore({
  reducer: {
    visibility:visibleReducer,
  },
})