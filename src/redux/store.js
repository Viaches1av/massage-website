// store.js
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export default store;
