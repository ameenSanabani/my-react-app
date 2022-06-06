import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modeReducer from '../features/varbile/modeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
  },
});
