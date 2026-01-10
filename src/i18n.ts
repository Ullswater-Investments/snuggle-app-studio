import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Spanish (Base)
import esCommon from './locales/es/common.json';
import esNav from './locales/es/nav.json';
import esLanding from './locales/es/landing.json';
import esSimulators from './locales/es/simulators.json';
import esSuccess from './locales/es/success.json';

// French
import frCommon from './locales/fr/common.json';
import frNav from './locales/fr/nav.json';
import frLanding from './locales/fr/landing.json';
import frSimulators from './locales/fr/simulators.json';
import frSuccess from './locales/fr/success.json';

// Portuguese
import ptCommon from './locales/pt/common.json';
import ptNav from './locales/pt/nav.json';
import ptLanding from './locales/pt/landing.json';
import ptSimulators from './locales/pt/simulators.json';
import ptSuccess from './locales/pt/success.json';

// German
import deCommon from './locales/de/common.json';
import deNav from './locales/de/nav.json';
import deLanding from './locales/de/landing.json';
import deSimulators from './locales/de/simulators.json';
import deSuccess from './locales/de/success.json';

// Italian
import itCommon from './locales/it/common.json';
import itNav from './locales/it/nav.json';
import itLanding from './locales/it/landing.json';
import itSimulators from './locales/it/simulators.json';
import itSuccess from './locales/it/success.json';

// Dutch
import nlCommon from './locales/nl/common.json';
import nlNav from './locales/nl/nav.json';
import nlLanding from './locales/nl/landing.json';
import nlSimulators from './locales/nl/simulators.json';
import nlSuccess from './locales/nl/success.json';

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
        success: esSuccess,
      },
      fr: {
        common: frCommon,
        nav: frNav,
        landing: frLanding,
        simulators: frSimulators,
        success: frSuccess,
      },
      pt: {
        common: ptCommon,
        nav: ptNav,
        landing: ptLanding,
        simulators: ptSimulators,
        success: ptSuccess,
      },
      de: {
        common: deCommon,
        nav: deNav,
        landing: deLanding,
        simulators: deSimulators,
        success: deSuccess,
      },
      it: {
        common: itCommon,
        nav: itNav,
        landing: itLanding,
        simulators: itSimulators,
        success: itSuccess,
      },
      nl: {
        common: nlCommon,
        nav: nlNav,
        landing: nlLanding,
        simulators: nlSimulators,
        success: nlSuccess,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing', 'simulators', 'success'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
