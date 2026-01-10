import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Spanish (Base)
import esCommon from './locales/es/common.json';
import esNav from './locales/es/nav.json';
import esLanding from './locales/es/landing.json';
import esSimulators from './locales/es/simulators.json';
import esSuccess from './locales/es/success.json';
import esCatalog from './locales/es/catalog.json';
import esServices from './locales/es/services.json';
import esInnovation from './locales/es/innovation.json';
import esSustainability from './locales/es/sustainability.json';

// French
import frCommon from './locales/fr/common.json';
import frNav from './locales/fr/nav.json';
import frLanding from './locales/fr/landing.json';
import frSimulators from './locales/fr/simulators.json';
import frSuccess from './locales/fr/success.json';
import frCatalog from './locales/fr/catalog.json';
import frServices from './locales/fr/services.json';
import frInnovation from './locales/fr/innovation.json';
import frSustainability from './locales/fr/sustainability.json';

// Portuguese
import ptCommon from './locales/pt/common.json';
import ptNav from './locales/pt/nav.json';
import ptLanding from './locales/pt/landing.json';
import ptSimulators from './locales/pt/simulators.json';
import ptSuccess from './locales/pt/success.json';
import ptCatalog from './locales/pt/catalog.json';
import ptServices from './locales/pt/services.json';
import ptInnovation from './locales/pt/innovation.json';
import ptSustainability from './locales/pt/sustainability.json';

// German
import deCommon from './locales/de/common.json';
import deNav from './locales/de/nav.json';
import deLanding from './locales/de/landing.json';
import deSimulators from './locales/de/simulators.json';
import deSuccess from './locales/de/success.json';
import deCatalog from './locales/de/catalog.json';
import deServices from './locales/de/services.json';
import deInnovation from './locales/de/innovation.json';
import deSustainability from './locales/de/sustainability.json';

// Italian
import itCommon from './locales/it/common.json';
import itNav from './locales/it/nav.json';
import itLanding from './locales/it/landing.json';
import itSimulators from './locales/it/simulators.json';
import itSuccess from './locales/it/success.json';
import itCatalog from './locales/it/catalog.json';
import itServices from './locales/it/services.json';
import itInnovation from './locales/it/innovation.json';
import itSustainability from './locales/it/sustainability.json';

// Dutch
import nlCommon from './locales/nl/common.json';
import nlNav from './locales/nl/nav.json';
import nlLanding from './locales/nl/landing.json';
import nlSimulators from './locales/nl/simulators.json';
import nlSuccess from './locales/nl/success.json';
import nlCatalog from './locales/nl/catalog.json';
import nlServices from './locales/nl/services.json';
import nlInnovation from './locales/nl/innovation.json';
import nlSustainability from './locales/nl/sustainability.json';

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
        catalog: esCatalog,
        services: esServices,
        innovation: esInnovation,
        sustainability: esSustainability,
      },
      fr: {
        common: frCommon,
        nav: frNav,
        landing: frLanding,
        simulators: frSimulators,
        success: frSuccess,
        catalog: frCatalog,
        services: frServices,
        innovation: frInnovation,
        sustainability: frSustainability,
      },
      pt: {
        common: ptCommon,
        nav: ptNav,
        landing: ptLanding,
        simulators: ptSimulators,
        success: ptSuccess,
        catalog: ptCatalog,
        services: ptServices,
        innovation: ptInnovation,
        sustainability: ptSustainability,
      },
      de: {
        common: deCommon,
        nav: deNav,
        landing: deLanding,
        simulators: deSimulators,
        success: deSuccess,
        catalog: deCatalog,
        services: deServices,
        innovation: deInnovation,
        sustainability: deSustainability,
      },
      it: {
        common: itCommon,
        nav: itNav,
        landing: itLanding,
        simulators: itSimulators,
        success: itSuccess,
        catalog: itCatalog,
        services: itServices,
        innovation: itInnovation,
        sustainability: itSustainability,
      },
      nl: {
        common: nlCommon,
        nav: nlNav,
        landing: nlLanding,
        simulators: nlSimulators,
        success: nlSuccess,
        catalog: nlCatalog,
        services: nlServices,
        innovation: nlInnovation,
        sustainability: nlSustainability,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing', 'simulators', 'success', 'catalog', 'services', 'innovation', 'sustainability'],
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
