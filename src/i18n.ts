import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Spanish (Base)
import esCommon from './locales/es/common.json';
import esNav from './locales/es/nav.json';
import esLanding from './locales/es/landing.json';
import esSimulators from './locales/es/simulators.json';

// French
import frCommon from './locales/fr/common.json';
import frNav from './locales/fr/nav.json';
import frLanding from './locales/fr/landing.json';
import frSimulators from './locales/fr/simulators.json';

// Portuguese
import ptCommon from './locales/pt/common.json';
import ptNav from './locales/pt/nav.json';
import ptLanding from './locales/pt/landing.json';
import ptSimulators from './locales/pt/simulators.json';

// German
import deCommon from './locales/de/common.json';
import deNav from './locales/de/nav.json';
import deLanding from './locales/de/landing.json';
import deSimulators from './locales/de/simulators.json';

// Italian
import itCommon from './locales/it/common.json';
import itNav from './locales/it/nav.json';
import itLanding from './locales/it/landing.json';
import itSimulators from './locales/it/simulators.json';

// Dutch
import nlCommon from './locales/nl/common.json';
import nlNav from './locales/nl/nav.json';
import nlLanding from './locales/nl/landing.json';
import nlSimulators from './locales/nl/simulators.json';

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
        simulators: esSimulators,
      },
      fr: {
        common: frCommon,
        nav: frNav,
        landing: frLanding,
        simulators: frSimulators,
      },
      pt: {
        common: ptCommon,
        nav: ptNav,
        landing: ptLanding,
        simulators: ptSimulators,
      },
      de: {
        common: deCommon,
        nav: deNav,
        landing: deLanding,
        simulators: deSimulators,
      },
      it: {
        common: itCommon,
        nav: itNav,
        landing: itLanding,
        simulators: itSimulators,
      },
      nl: {
        common: nlCommon,
        nav: nlNav,
        landing: nlLanding,
        simulators: nlSimulators,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing', 'simulators'],
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
