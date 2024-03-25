import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import qandasReducer from '../features/qandas/qandasSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    qandas: qandasReducer
  },
});

