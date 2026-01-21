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
import esOpportunities from './locales/es/opportunities.json';
import esModels from './locales/es/models.json';
import esMotor from './locales/es/motor.json';
import esSyntheticData from './locales/es/syntheticData.json';
import esPartnerProducts from './locales/es/partnerProducts.json';
import esPremiumPartners from './locales/es/premium-partners.json';
import esPartners from './locales/es/partners.json';
import esDemoTour from './locales/es/demo-tour.json';
import esSettings from './locales/es/settings.json';
import esRegister from './locales/es/register.json';
import esContract from './locales/es/contract.json';
import esCloserstill from './locales/es/closerstill.json';
import esCatalogDetails from './locales/es/catalogDetails.json';
import esGreenProcurement from './locales/es/greenProcurement.json';
import esUseCases from './locales/es/useCases.json';
import esDiagrams from './locales/es/diagrams.json';
import esDashboard from './locales/es/dashboard.json';
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
import frOpportunities from './locales/fr/opportunities.json';
import frModels from './locales/fr/models.json';
import frMotor from './locales/fr/motor.json';
import frSyntheticData from './locales/fr/syntheticData.json';
import frPartnerProducts from './locales/fr/partnerProducts.json';
import frPremiumPartners from './locales/fr/premium-partners.json';
import frPartners from './locales/fr/partners.json';
import frDemoTour from './locales/fr/demo-tour.json';
import frSettings from './locales/fr/settings.json';
import frRegister from './locales/fr/register.json';
import frContract from './locales/fr/contract.json';
import frCloserstill from './locales/fr/closerstill.json';
import frCatalogDetails from './locales/fr/catalogDetails.json';
import frUseCases from './locales/fr/useCases.json';
import frDiagrams from './locales/fr/diagrams.json';
import frDashboard from './locales/fr/dashboard.json';

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
import ptOpportunities from './locales/pt/opportunities.json';
import ptModels from './locales/pt/models.json';
import ptMotor from './locales/pt/motor.json';
import ptSyntheticData from './locales/pt/syntheticData.json';
import ptPartnerProducts from './locales/pt/partnerProducts.json';
import ptPremiumPartners from './locales/pt/premium-partners.json';
import ptPartners from './locales/pt/partners.json';
import ptDemoTour from './locales/pt/demo-tour.json';
import ptSettings from './locales/pt/settings.json';
import ptRegister from './locales/pt/register.json';
import ptContract from './locales/pt/contract.json';
import ptCloserstill from './locales/pt/closerstill.json';
import ptCatalogDetails from './locales/pt/catalogDetails.json';
import ptUseCases from './locales/pt/useCases.json';
import ptDiagrams from './locales/pt/diagrams.json';
import ptDashboard from './locales/pt/dashboard.json';

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
import deOpportunities from './locales/de/opportunities.json';
import deModels from './locales/de/models.json';
import deMotor from './locales/de/motor.json';
import deSyntheticData from './locales/de/syntheticData.json';
import dePartnerProducts from './locales/de/partnerProducts.json';
import dePremiumPartners from './locales/de/premium-partners.json';
import dePartners from './locales/de/partners.json';
import deDemoTour from './locales/de/demo-tour.json';
import deSettings from './locales/de/settings.json';
import deRegister from './locales/de/register.json';
import deContract from './locales/de/contract.json';
import deCloserstill from './locales/de/closerstill.json';
import deCatalogDetails from './locales/de/catalogDetails.json';
import deUseCases from './locales/de/useCases.json';
import deDiagrams from './locales/de/diagrams.json';
import deDashboard from './locales/de/dashboard.json';

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
import itOpportunities from './locales/it/opportunities.json';
import itModels from './locales/it/models.json';
import itMotor from './locales/it/motor.json';
import itSyntheticData from './locales/it/syntheticData.json';
import itPartnerProducts from './locales/it/partnerProducts.json';
import itPremiumPartners from './locales/it/premium-partners.json';
import itPartners from './locales/it/partners.json';
import itDemoTour from './locales/it/demo-tour.json';
import itSettings from './locales/it/settings.json';
import itRegister from './locales/it/register.json';
import itContract from './locales/it/contract.json';
import itCloserstill from './locales/it/closerstill.json';
import itCatalogDetails from './locales/it/catalogDetails.json';
import itUseCases from './locales/it/useCases.json';
import itDiagrams from './locales/it/diagrams.json';
import itDashboard from './locales/it/dashboard.json';

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
import nlOpportunities from './locales/nl/opportunities.json';
import nlModels from './locales/nl/models.json';
import nlMotor from './locales/nl/motor.json';
import nlSyntheticData from './locales/nl/syntheticData.json';
import nlPartnerProducts from './locales/nl/partnerProducts.json';
import nlPremiumPartners from './locales/nl/premium-partners.json';
import nlPartners from './locales/nl/partners.json';
import nlDemoTour from './locales/nl/demo-tour.json';
import nlSettings from './locales/nl/settings.json';
import nlRegister from './locales/nl/register.json';
import nlContract from './locales/nl/contract.json';
import nlCloserstill from './locales/nl/closerstill.json';
import nlCatalogDetails from './locales/nl/catalogDetails.json';
import nlUseCases from './locales/nl/useCases.json';
import nlDiagrams from './locales/nl/diagrams.json';
import nlDashboard from './locales/nl/dashboard.json';

// English
import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enLanding from './locales/en/landing.json';
import enSimulators from './locales/en/simulators.json';
import enSuccess from './locales/en/success.json';
import enCatalog from './locales/en/catalog.json';
import enServices from './locales/en/services.json';
import enInnovation from './locales/en/innovation.json';
import enSustainability from './locales/en/sustainability.json';
import enOpportunities from './locales/en/opportunities.json';
import enModels from './locales/en/models.json';
import enMotor from './locales/en/motor.json';
import enSyntheticData from './locales/en/syntheticData.json';
import enPartnerProducts from './locales/en/partnerProducts.json';
import enPremiumPartners from './locales/en/premium-partners.json';
import enPartners from './locales/en/partners.json';
import enDemoTour from './locales/en/demo-tour.json';
import enSettings from './locales/en/settings.json';
import enRegister from './locales/en/register.json';
import enContract from './locales/en/contract.json';
import enCloserstill from './locales/en/closerstill.json';
import enCatalogDetails from './locales/en/catalogDetails.json';
import enGreenProcurement from './locales/en/greenProcurement.json';
import enUseCases from './locales/en/useCases.json';
import enDiagrams from './locales/en/diagrams.json';
import enDashboard from './locales/en/dashboard.json';

export const supportedLanguages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
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
        opportunities: esOpportunities,
        models: esModels,
        motor: esMotor,
        syntheticData: esSyntheticData,
        partnerProducts: esPartnerProducts,
        premiumPartners: esPremiumPartners,
        partners: esPartners,
        'demo-tour': esDemoTour,
        settings: esSettings,
        register: esRegister,
        contract: esContract,
        closerstill: esCloserstill,
        catalogDetails: esCatalogDetails,
        useCases: esUseCases,
        greenProcurement: esGreenProcurement,
        diagrams: esDiagrams,
        dashboard: esDashboard,
      },
      en: {
        common: enCommon,
        nav: enNav,
        landing: enLanding,
        simulators: enSimulators,
        success: enSuccess,
        catalog: enCatalog,
        services: enServices,
        innovation: enInnovation,
        sustainability: enSustainability,
        opportunities: enOpportunities,
        models: enModels,
        motor: enMotor,
        syntheticData: enSyntheticData,
        partnerProducts: enPartnerProducts,
        premiumPartners: enPremiumPartners,
        partners: enPartners,
        'demo-tour': enDemoTour,
        settings: enSettings,
        register: enRegister,
        contract: enContract,
        closerstill: enCloserstill,
        catalogDetails: enCatalogDetails,
        useCases: enUseCases,
        greenProcurement: enGreenProcurement,
        diagrams: enDiagrams,
        dashboard: enDashboard,
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
        opportunities: frOpportunities,
        models: frModels,
        motor: frMotor,
        syntheticData: frSyntheticData,
        partnerProducts: frPartnerProducts,
        premiumPartners: frPremiumPartners,
        partners: frPartners,
        'demo-tour': frDemoTour,
        settings: frSettings,
        register: frRegister,
        contract: frContract,
        closerstill: frCloserstill,
        catalogDetails: frCatalogDetails,
        useCases: frUseCases,
        diagrams: frDiagrams,
        dashboard: frDashboard,
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
        opportunities: ptOpportunities,
        models: ptModels,
        motor: ptMotor,
        syntheticData: ptSyntheticData,
        partnerProducts: ptPartnerProducts,
        premiumPartners: ptPremiumPartners,
        partners: ptPartners,
        'demo-tour': ptDemoTour,
        settings: ptSettings,
        register: ptRegister,
        contract: ptContract,
        closerstill: ptCloserstill,
        catalogDetails: ptCatalogDetails,
        useCases: ptUseCases,
        diagrams: ptDiagrams,
        dashboard: ptDashboard,
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
        opportunities: deOpportunities,
        models: deModels,
        motor: deMotor,
        syntheticData: deSyntheticData,
        partnerProducts: dePartnerProducts,
        premiumPartners: dePremiumPartners,
        partners: dePartners,
        'demo-tour': deDemoTour,
        settings: deSettings,
        register: deRegister,
        contract: deContract,
        closerstill: deCloserstill,
        catalogDetails: deCatalogDetails,
        useCases: deUseCases,
        diagrams: deDiagrams,
        dashboard: deDashboard,
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
        opportunities: itOpportunities,
        models: itModels,
        motor: itMotor,
        syntheticData: itSyntheticData,
        partnerProducts: itPartnerProducts,
        premiumPartners: itPremiumPartners,
        partners: itPartners,
        'demo-tour': itDemoTour,
        settings: itSettings,
        register: itRegister,
        contract: itContract,
        closerstill: itCloserstill,
        catalogDetails: itCatalogDetails,
        useCases: itUseCases,
        diagrams: itDiagrams,
        dashboard: itDashboard,
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
        opportunities: nlOpportunities,
        models: nlModels,
        motor: nlMotor,
        syntheticData: nlSyntheticData,
        partnerProducts: nlPartnerProducts,
        premiumPartners: nlPremiumPartners,
        partners: nlPartners,
        'demo-tour': nlDemoTour,
        settings: nlSettings,
        register: nlRegister,
        contract: nlContract,
        closerstill: nlCloserstill,
        catalogDetails: nlCatalogDetails,
        useCases: nlUseCases,
        diagrams: nlDiagrams,
        dashboard: nlDashboard,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing', 'simulators', 'success', 'catalog', 'services', 'innovation', 'sustainability', 'opportunities', 'models', 'motor', 'syntheticData', 'partnerProducts', 'premiumPartners', 'partners', 'demo-tour', 'settings', 'register', 'contract', 'closerstill', 'catalogDetails', 'greenProcurement', 'diagrams', 'useCases', 'dashboard'],
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
