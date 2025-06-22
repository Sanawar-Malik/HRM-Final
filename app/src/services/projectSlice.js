import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./localStorage";


export const addProject = createAsyncThunk("addProject", async (formData, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post("http://127.0.0.1:8000/api/project/", formData, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const allProject = createAsyncThunk("allProject", async () => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.get("http://127.0.0.1:8000/api/project/", config);
  // console.log(response.data);
  return response.data

});



export const deleteProject = createAsyncThunk("deleteProject", async (id, { rejectWithValue }) => {
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(`http://127.0.0.1:8000/api/project/${id}/`, config);
  try {
    const result = response.data;
    // console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateProject = createAsyncThunk("updateProject", async ({ formData, id }) => {
  // console.log("formData", formData);
  const { access_token } = getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.put(`http://127.0.0.1:8000/api/project/${id}/`, formData, config);
  return response.data;
});



export const projectDetail = createSlice({
  name: "projectDetail",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [addProject.pending]: (state) => {
      state.loading = true;
    },
    [addProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);

    },
    [addProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [allProject.pending]: (state) => {
      state.loading = true;
    },
    [allProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;

    },
    [allProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteProject.pending]: (state) => {
      state.loading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.projects = state.projects.filter((ele) => ele.id !== id);
      }
      console.log("Delete Action", action.payload);

    },
    [deleteProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    [updateProject.pending]: (state) => {
      state.loading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    [updateProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },

  },
});

export default projectDetail.reducer;
