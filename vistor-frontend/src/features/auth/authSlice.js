import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authServies from './authServies';

const initialState = {
  user: null,
  loading: false,
  seccess: false,
  isErorr: false,
  message: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, thunkAPI) => {
    try {
      return await authServies.registerUsers(data);
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

export const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.seccess = false;
      state.isErorr = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.seccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isErorr = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlicer.actions;
export default authSlicer.reducer;
