import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vistorServes from './vistorServes';

const vistor = JSON.parse(localStorage.getItem('vistor'));

const initialState = {
  vistor: vistor ? vistor : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const vistorAdd = createAsyncThunk(
  'vistor/vistorAdd',
  async (vistorData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vistorServes.addVistor(vistorData, token);
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

export const getVistor = createAsyncThunk(
  'vistor/getVistor',
  async (thunkAPI) => {
    try {
      return await vistorServes.vistorGet();
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

export const delVistor = createAsyncThunk(
  'vistor/delVistor',
  async (praper, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vistorServes.vistorDel(praper, token);
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

export const updVistor = createAsyncThunk(
  'viistor/updVistor',
  async (vistorId, updatedInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vistorServes.vistorUpd(vistorId, updatedInfo, token);
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

export const vistorSlice = createSlice({
  name: 'vistor',
  initialState,
  reducers: {
    reset: (state) => {
      state.vistor = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(vistorAdd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(vistorAdd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vistor = action.payload;
      })
      .addCase(vistorAdd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vistor = null;
      })
      .addCase(getVistor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVistor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vistor = action.payload;
      })
      .addCase(getVistor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vistor = null;
      })
      .addCase(delVistor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delVistor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vistor = action.payload;
      })
      .addCase(delVistor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vistor = null;
      })
      .addCase(updVistor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updVistor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vistor = action.payload;
      })
      .addCase(updVistor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vistor = null;
      });
  },
});

export const { reset } = vistorSlice.actions;
export default vistorSlice.reducer;
