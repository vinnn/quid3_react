import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import qandasReducer from '../features/qandas/qandasSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import gamesReducer from '../features/games/gamesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    qandas: qandasReducer,
    categories: categoriesReducer,
    games: gamesReducer
  },
});

