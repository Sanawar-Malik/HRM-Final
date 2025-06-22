import { createSlice } from "@reduxjs/toolkit";
import { defaults } from "autoprefixer";


const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  gender: "",
  address: "",
  phone: "",
  image: "",
  date_of_birth: "",
  city: "",
  country: "",
  degree: "",
  department: "",
  document: "",
  role: "",
  created_at: "",

}

export const userSlice = createSlice({
  name: "user_profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.address = action.payload.address
      state.phone = action.payload.phone
      state.gender = action.payload.gender
      state.image = action.payload.image
      state.date_of_birth = action.payload.date_of_birth
      state.city = action.payload.city
      state.country = action.payload.country
      state.degree = action.payload.degree
      state.department = action.payload.department
      state.document = action.payload.document
      state.role = action.payload.role
      state.created_at = action.payload.created_at

    },
    unsetUserProfile: (state, action) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.address = action.payload.address
      state.phone = action.payload.phone
      state.gender = action.payload.gender
      state.image = action.payload.image
      state.date_of_birth = action.payload.date_of_birth
      state.city = action.payload.city
      state.country = action.payload.country
      state.degree = action.payload.degree
      state.department = action.payload.department
      state.document = action.payload.document
      state.role = action.payload.role
      state.created_at = action.payload.created_at


    },

  }
})

export const { setUserProfile, unsetUserProfile } = userSlice.actions
export default userSlice.reducer
