import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from './localStorage';


export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (data, thunkAPI) => {
    try {
      const { access_token } = getToken();

      const config = {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      };
      const response = await axios.post('http://127.0.0.1:8000/api/attendance/', data, config);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: [],
  extraReducers: {
    [markAttendance.pending]: (state) => {
      state.loading = true;
    },
    [markAttendance.fulfilled]: (state, action) => {
      state.loading = false;
      state.attendance.push(action.payload);

    },
    [markAttendance.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default attendanceSlice.reducer;

