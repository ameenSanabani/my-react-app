import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modeReducer from '../features/varbile/modeSlice';
import vistorReducer from '../features/vistor/vistorSlicer';
import productReducer from '../features/products/productSlicer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
    vistors: vistorReducer,
    products: productReducer,
  },
});
