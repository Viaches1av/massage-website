// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Инициализация i18n
i18n
  .use(HttpBackend) // Добавляем backend для загрузки переводов
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React автоматически экранирует строки
    },
    ns: ['common', 'contact-page', 'homepage', 'layout', 'massage-page', 'prices-page'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к переводам
    },
    react: {
      useSuspense: true, // Включаем Suspense
    },
  });

export default i18n;
