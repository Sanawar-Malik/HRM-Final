import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./localStorage";


export const addEmployee = createAsyncThunk("addEmployee", async (formData, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post("http://127.0.0.1:8000/api/emp/", formData, config);
  try {
    const result = response.data;
    //console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const allEmployee = createAsyncThunk("allEmployee", async () => {
  const { access_token } = getToken();

  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.get("http://127.0.0.1:8000/api/emp/", config);
  // console.log(response.data);
  return response.data

});



export const deleteEmployee = createAsyncThunk("deleteEmployee", async (id, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(`http://127.0.0.1:8000/api/emp/${id}/`, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateEmployee = createAsyncThunk("updateEmployee", async ({ formData, id }) => {
  console.log(formData);
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.put(`http://127.0.0.1:8000/api/emp/${id}/`, formData, config);
  return response.data;
});



export const employeeDetail = createSlice({
  name: "employeeDetail",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [addEmployee.pending]: (state) => {
      state.loading = true;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees.push(action.payload);

    },
    [addEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [allEmployee.pending]: (state) => {
      state.loading = true;
    },
    [allEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;

    },
    [allEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.employees = state.employees.filter((ele) => ele.id !== id);
      }
      console.log("Delete Action", action.payload);

    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [updateEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },

  },
});

export default employeeDetail.reducer;
