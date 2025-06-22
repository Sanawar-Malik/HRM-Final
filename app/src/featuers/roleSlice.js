import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: null,
}

export const roleSlice = createSlice({
  name: 'user_role',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload.role
    },
    unSetUserRole: (state, action) => {
      state.role = action.payload.role
    },
  },
})

export const { setUserRole, unSetUserRole } = roleSlice.actions

export default roleSlice.reducer

