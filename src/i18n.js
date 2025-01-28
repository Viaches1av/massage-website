import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import plCommon from './locales/pl/common.json';
import plContactPage from './locales/pl/contact-page.json';
import plHomepage from './locales/pl/homepage.json';
import plLayout from './locales/pl/layout.json';
import plMassagePage from './locales/pl/massage-page.json';
import plPricesPage from './locales/pl/prices-page.json';
import enCommon from './locales/en/common.json';
import enContactPage from './locales/en/contact-page.json';
import enHomepage from './locales/en/homepage.json';
import enLayout from './locales/en/layout.json';
import enMassagePage from './locales/en/massage-page.json';
import enPricesPage from './locales/en/prices-page.json';
import uaCommon from './locales/ua/common.json';
import uaContactPage from './locales/ua/contact-page.json';
import uaHomepage from './locales/ua/homepage.json';
import uaLayout from './locales/ua/layout.json';
import uaMassagePage from './locales/ua/massage-page.json';
import uaPricesPage from './locales/ua/prices-page.json';

// Ресурсы переводов
const resources = {
  pl: {
    common: plCommon,
    'contact-page': plContactPage,
    homepage: plHomepage,
    layout: plLayout,
    'massage-page': plMassagePage,
    'prices-page': plPricesPage,
  },
  en: {
    common: enCommon,
    'contact-page': enContactPage,
    homepage: enHomepage,
    layout: enLayout,
    'massage-page': enMassagePage,
    'prices-page': enPricesPage,
  },
  ua: {
    common: uaCommon,
    'contact-page': uaContactPage,
    homepage: uaHomepage,
    layout: uaLayout,
    'massage-page': uaMassagePage,
    'prices-page': uaPricesPage,
  },
};

// Инициализация i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React автоматически экранирует строки
    },
    ns: ['common', 'contact-page', 'homepage', 'layout', 'massage-page', 'prices-page'],
    defaultNS: 'common',
  });

export default i18n;
//работает