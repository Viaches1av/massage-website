import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer,
  },
});

export default store;
