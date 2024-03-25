import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,    // reducer from SLIDE counter
    auth: authReducer           // reducer from SLIDE auth
  },
});


