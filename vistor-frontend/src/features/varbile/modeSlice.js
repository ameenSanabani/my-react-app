import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import changeMode from './modeServies';

const mode = localStorage.getItem('mode') === 'ON' ? true : false;

const initialState = {
  modeDark: mode ? mode : false,
};

export const modeChange = createAsyncThunk(
  'mode/modeChange',
  async (data, thunkAPI) => {
    try {
      return await changeMode(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const modeSlicer = createSlice({
  name: 'mode',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(modeChange.fulfilled, (state) => {
      state.modeDark = !state.modeDark;
    });
  },
});

export default modeSlicer.reducer;
