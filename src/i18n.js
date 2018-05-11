import i18n from 'i18next';
//import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

i18n
//  .use(LanguageDetector)  // it does not return expected language ow web browser language changes
  .use(reactI18nextModule)
  .use(Backend)
  .init({
      
    backend: {
      // load all locale json files
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    
    fallbackLng: 'en-CA',
    
    // set Navigator's language (language must be at the top of preference list in Chrome, not diplay language)
    'lng': window.navigator.language || window.navigator.userLanguage,

    // have a common namespace used around the full app
    defaultNS: 'common',
    allowMultiLoading: false,

    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    },
    
//    order: ['navigator']  // LanguageDetector's option to look at Navigator language setting
    
  });


export default i18n;