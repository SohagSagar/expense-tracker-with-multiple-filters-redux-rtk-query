import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import filterReducer from '../features/filterSlice/filterSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    filter:filterReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
