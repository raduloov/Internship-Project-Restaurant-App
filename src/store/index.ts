import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import apiSlice from './api-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    api: apiSlice.reducer
  }
});

export default store;
