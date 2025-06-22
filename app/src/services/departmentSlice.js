import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./localStorage";


export const addDepartment = createAsyncThunk("addDepartment", async (formData, { rejectWithValue }) => {
  // console.log("data", formData)
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post("http://127.0.0.1:8000/api/dep/", formData, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const allDepartment = createAsyncThunk("allDepartment", async () => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.get("http://127.0.0.1:8000/api/dep/", config);
  // console.log(response.data);
  return response.data

});



export const deleteDepartment = createAsyncThunk("deleteDepartment", async (id, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(`http://127.0.0.1:8000/api/dep/${id}/`, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateDepartment = createAsyncThunk("updateDepartment", async ({ formData, id }) => {
  // console.log("formData", formData);
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.put(`http://127.0.0.1:8000/api/dep/${id}/`, formData, config);
  return response.data;
});



export const departmentDetail = createSlice({
  name: "departmentDetail",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [addDepartment.pending]: (state) => {
      state.loading = true;
    },
    [addDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.departments.push(action.payload);

    },
    [addDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [allDepartment.pending]: (state) => {
      state.loading = true;
    },
    [allDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.departments = action.payload;

    },
    [allDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteDepartment.pending]: (state) => {
      state.loading = true;
    },
    [deleteDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.departments = state.departments.filter((ele) => ele.id !== id);
      }
      console.log("Delete Action", action.payload);

    },
    [deleteDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [updateDepartment.pending]: (state) => {
      state.loading = true;
    },
    [updateDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    [updateDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },

  },
});

export default departmentDetail.reducer;
