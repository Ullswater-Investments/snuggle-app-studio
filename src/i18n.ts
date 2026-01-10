import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Spanish (Base)
import esCommon from './locales/es/common.json';
import esNav from './locales/es/nav.json';
import esLanding from './locales/es/landing.json';

// French
import frCommon from './locales/fr/common.json';
import frNav from './locales/fr/nav.json';

// Portuguese
import ptCommon from './locales/pt/common.json';
import ptNav from './locales/pt/nav.json';

// German
import deCommon from './locales/de/common.json';
import deNav from './locales/de/nav.json';

// Italian
import itCommon from './locales/it/common.json';
import itNav from './locales/it/nav.json';

// Dutch
import nlCommon from './locales/nl/common.json';
import nlNav from './locales/nl/nav.json';

export const supportedLanguages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
] as const;

export type SupportedLanguage = typeof supportedLanguages[number]['code'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: esCommon,
        nav: esNav,
        landing: esLanding,
      },
      fr: {
        common: frCommon,
        nav: frNav,
      },
      pt: {
        common: ptCommon,
        nav: ptNav,
      },
      de: {
        common: deCommon,
        nav: deNav,
      },
      it: {
        common: itCommon,
        nav: itNav,
      },
      nl: {
        common: nlCommon,
        nav: nlNav,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
