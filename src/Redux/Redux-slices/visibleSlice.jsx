import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const visibleSlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    visible: (state) => {
      state.value = true
    },
    invisible: (state) => {
      state.value = false
    },
  },
})
export const {visible, invisible} = visibleSlice.actions
export default visibleSlice.reducer
