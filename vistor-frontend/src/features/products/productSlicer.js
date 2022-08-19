import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productServes from './productServes';

const initialState = {
  products: null,
  isErrorPr: false,
  isSuccessPr: false,
  isLoadingPr: false,
  messagePr: '',
};

export const productAdd = createAsyncThunk(
  'product/productAdd',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productServes.addProduct(productData, token);
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

export const productGet = createAsyncThunk(
  'product/productGet',
  async (productId, thunkAPI) => {
    try {
      return await productServes.getProduct(productId);
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

export const productUpd = createAsyncThunk(
  'product/productUpd',
  async (productId, updatedInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productServes.updProduct(productId, updatedInfo, token);
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.products = null;
      state.isLoadingPr = false;
      state.isSuccessPr = false;
      state.isErrorPr = false;
      state.messagePr = '';
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(productAdd.pending, (state) => {
        state.isLoadingPr = true;
      })
      .addCase(productAdd.fulfilled, (state, action) => {
        state.isLoadingPr = false;
        state.isSuccessPr = true;
        state.products = action.payload;
      })
      .addCase(productAdd.rejected, (state, action) => {
        state.isLoadingPr = false;
        state.isErrorPr = true;
        state.messagePr = action.payload;
        state.products = null;
      })
      .addCase(productGet.pending, (state) => {
        state.isLoadingPr = true;
      })
      .addCase(productGet.fulfilled, (state, action) => {
        state.isLoadingPr = false;
        state.isSuccessPr = true;
        state.products = action.payload;
      })
      .addCase(productGet.rejected, (state, action) => {
        state.isLoadingPr = false;
        state.isErrorPr = true;
        state.messagePr = action.payload;
        state.products = null;
      })
      .addCase(productUpd.pending, (state) => {
        state.isLoadingPr = true;
      })
      .addCase(productUpd.fulfilled, (state, action) => {
        state.isLoadingPr = false;
        state.isSuccessPr = true;
        state.products = action.payload;
      })
      .addCase(productUpd.rejected, (state, action) => {
        state.isLoadingPr = false;
        state.isErrorPr = true;
        state.messagePr = action.payload;
        state.products = null;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
