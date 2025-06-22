import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./localStorage";


export const addSalary = createAsyncThunk("addSalary", async (formData, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post("http://127.0.0.1:8000/api/salary/", formData, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const allSalary = createAsyncThunk("allSalary", async () => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.get("http://127.0.0.1:8000/api/salary/", config);
  // console.log(response.data);
  return response.data

});



export const deleteSalary = createAsyncThunk("deleteSalary", async (id, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(`http://127.0.0.1:8000/api/salary/${id}/`, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateSalary = createAsyncThunk("updateSalary", async ({ formData, id }) => {
  // console.log("formData", formData);
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.put(`http://127.0.0.1:8000/api/salary/${id}/`, formData, config);
  return response.data;
});



export const salaryDetail = createSlice({
  name: "salaryDetail",
  initialState: {
    salaries: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [addSalary.pending]: (state) => {
      state.loading = true;
    },
    [addSalary.fulfilled]: (state, action) => {
      state.loading = false;
      state.salaries.push(action.payload);

    },
    [addSalary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [allSalary.pending]: (state) => {
      state.loading = true;
    },
    [allSalary.fulfilled]: (state, action) => {
      state.loading = false;
      state.salaries = action.payload;

    },
    [allSalary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteSalary.pending]: (state) => {
      state.loading = true;
    },
    [deleteSalary.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.salaries = state.salaries.filter((ele) => ele.id !== id);
      }
      console.log("Delete Action", action.payload);

    },
    [deleteSalary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [updateSalary.pending]: (state) => {
      state.loading = true;
    },
    [updateSalary.fulfilled]: (state, action) => {
      state.loading = false;
      state.salaries = action.payload;
    },
    [updateSalary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },

  },
});

export default salaryDetail.reducer;
