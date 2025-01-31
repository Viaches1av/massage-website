// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedLanguage = localStorage.getItem('language');

const initialState = {
  language: savedLanguage || 'pl',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const supportedLanguages = ['pl', 'ua', 'en'];
      if (supportedLanguages.includes(action.payload)) {
        state.language = action.payload;
        localStorage.setItem('language', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
