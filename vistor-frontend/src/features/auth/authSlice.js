import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authServies from './authServies';

const auth = JSON.parse(localStorage.getItem('auth'));

const initialState = {
  user: auth ? auth : null,
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, thunkAPI) => {
    try {
      return await authServies.loginUsers(data);
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (thunkAPI) => {
    try {
      return await authServies.logoutUsers();
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

export const changPassword = createAsyncThunk(
  'auth/changPassword',
  async (passwordEdit, thunkAPI) => {
    try {
      return await authServies.passwordChange(passwordEdit);
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

export const updateInfo = createAsyncThunk(
  'auth/updateInfo',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authServies.infoUpdate(data, token);
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

export const getMy = createAsyncThunk('auth/getMy', async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authServies.gMy(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isErorr = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.seccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isErorr = true;
        state.message = action.payload;
      })
      .addCase(updateInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.seccess = true;
        state.user = action.payload;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.loading = false;
        state.isErorr = true;
        state.message = action.payload;
      })
      .addCase(changPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.seccess = true;
      })
      .addCase(changPassword.rejected, (state, action) => {
        state.loading = false;
        state.isErorr = true;
        state.message = action.payload;
      })
      .addCase(getMy.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getMy.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlicer.actions;
export default authSlicer.reducer;
