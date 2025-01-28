import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'ru', // Язык по умолчанию
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const supportedLanguages = ['ru', 'ua', 'pl'];
      if (supportedLanguages.includes(action.payload)) {
        state.language = action.payload; // Устанавливаем язык, если он поддерживается
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
