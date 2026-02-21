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
import esRequests from './locales/es/requests.json';
import esData from './locales/es/data.json';
import esReports from './locales/es/reports.json';
import esNotifications from './locales/es/notifications.json';
import esAnalytics from './locales/es/analytics.json';
import esKit from './locales/es/kit.json';
import esGuide from './locales/es/guide.json';
import esUserGuide from './locales/es/userGuide.json';
import esWhitepaper from './locales/es/whitepaper.json';
import esNodes from './locales/es/nodes.json';
import esPartnerPages from './locales/es/partner-pages.json';
import esItbid from './locales/es/itbid.json';
import esSeres from './locales/es/seres.json';
import esCloserstillProyecto from './locales/es/closerstill-proyecto.json';
import esValerdata from './locales/es/valerdata.json';
import esAracea from './locales/es/aracea.json';
import esTelenatura from './locales/es/telenatura.json';
import esAerce from './locales/es/aerce.json';
import esArchitecture from './locales/es/architecture.json';
import esDocs from './locales/es/docs.json';
import esChat from './locales/es/chat.json';
import esFundamentos from './locales/es/fundamentos.json';
import esCatalogoDatos from './locales/es/catalogoDatos.json';
import esFlujo3Actores from './locales/es/flujo3Actores.json';
import esPoliticasOdrl from './locales/es/politicasOdrl.json';
import esWeb3Dids from './locales/es/web3Dids.json';
import esIAConversacional from './locales/es/iaConversacional.json';
import esConectoresErp from './locales/es/conectoresErp.json';
import esRedGaiaX from './locales/es/redGaiaX.json';
import esAnalyticsBi from './locales/es/analyticsBi.json';
import esMultiSector from './locales/es/multiSector.json';
import esUne0087 from './locales/es/une0087.json';
import esUneRecommendations from './locales/es/uneRecommendations.json';
import esRulebook from './locales/es/rulebook.json';
import esGlossaryUne from './locales/es/glossaryUne.json';
import esTransparency from './locales/es/transparency.json';
import esAdmin from './locales/es/admin.json';
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
import frRequests from './locales/fr/requests.json';
import frData from './locales/fr/data.json';
import frReports from './locales/fr/reports.json';
import frNotifications from './locales/fr/notifications.json';
import frAnalytics from './locales/fr/analytics.json';
import frNodes from './locales/fr/nodes.json';
import frPartnerPages from './locales/fr/partner-pages.json';
import frItbid from './locales/fr/itbid.json';
import frSeres from './locales/fr/seres.json';
import frCloserstillProyecto from './locales/fr/closerstill-proyecto.json';
import frValerdata from './locales/fr/valerdata.json';
import frAracea from './locales/fr/aracea.json';
import frTelenatura from './locales/fr/telenatura.json';
import frAerce from './locales/fr/aerce.json';
import frArchitecture from './locales/fr/architecture.json';
import frUserGuide from './locales/fr/userGuide.json';
import frGuide from './locales/fr/guide.json';
import frWhitepaper from './locales/fr/whitepaper.json';
import frKit from './locales/fr/kit.json';
import frDocs from './locales/fr/docs.json';
import frChat from './locales/fr/chat.json';
import frGreenProcurement from './locales/fr/greenProcurement.json';
import frFundamentos from './locales/fr/fundamentos.json';
import frCatalogoDatos from './locales/fr/catalogoDatos.json';
import frFlujo3Actores from './locales/fr/flujo3Actores.json';
import frPoliticasOdrl from './locales/fr/politicasOdrl.json';
import frWeb3Dids from './locales/fr/web3Dids.json';
import frIAConversacional from './locales/fr/iaConversacional.json';
import frConectoresErp from './locales/fr/conectoresErp.json';
import frRedGaiaX from './locales/fr/redGaiaX.json';
import frAnalyticsBi from './locales/fr/analyticsBi.json';
import frMultiSector from './locales/fr/multiSector.json';
import frUne0087 from './locales/fr/une0087.json';
import frUneRecommendations from './locales/fr/uneRecommendations.json';
import frRulebook from './locales/fr/rulebook.json';
import frGlossaryUne from './locales/fr/glossaryUne.json';
import frTransparency from './locales/fr/transparency.json';
import frAdmin from './locales/fr/admin.json';

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
import ptRequests from './locales/pt/requests.json';
import ptData from './locales/pt/data.json';
import ptReports from './locales/pt/reports.json';
import ptNotifications from './locales/pt/notifications.json';
import ptAnalytics from './locales/pt/analytics.json';
import ptNodes from './locales/pt/nodes.json';
import ptPartnerPages from './locales/pt/partner-pages.json';
import ptItbid from './locales/pt/itbid.json';
import ptSeres from './locales/pt/seres.json';
import ptCloserstillProyecto from './locales/pt/closerstill-proyecto.json';
import ptValerdata from './locales/pt/valerdata.json';
import ptAracea from './locales/pt/aracea.json';
import ptTelenatura from './locales/pt/telenatura.json';
import ptAerce from './locales/pt/aerce.json';
import ptUserGuide from './locales/pt/userGuide.json';
import ptGuide from './locales/pt/guide.json';
import ptWhitepaper from './locales/pt/whitepaper.json';
import ptKit from './locales/pt/kit.json';
import ptDocs from './locales/pt/docs.json';
import ptChat from './locales/pt/chat.json';
import ptFundamentos from './locales/pt/fundamentos.json';
import ptCatalogoDatos from './locales/pt/catalogoDatos.json';
import ptFlujo3Actores from './locales/pt/flujo3Actores.json';
import ptPoliticasOdrl from './locales/pt/politicasOdrl.json';
import ptWeb3Dids from './locales/pt/web3Dids.json';
import ptIAConversacional from './locales/pt/iaConversacional.json';
import ptConectoresErp from './locales/pt/conectoresErp.json';
import ptRedGaiaX from './locales/pt/redGaiaX.json';
import ptAnalyticsBi from './locales/pt/analyticsBi.json';
import ptMultiSector from './locales/pt/multiSector.json';
import ptUne0087 from './locales/pt/une0087.json';
import ptUneRecommendations from './locales/pt/uneRecommendations.json';
import ptRulebook from './locales/pt/rulebook.json';
import ptGlossaryUne from './locales/pt/glossaryUne.json';
import ptTransparency from './locales/pt/transparency.json';
import ptAdmin from './locales/pt/admin.json';

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
import deRequests from './locales/de/requests.json';
import deData from './locales/de/data.json';
import deReports from './locales/de/reports.json';
import deNotifications from './locales/de/notifications.json';
import deAnalytics from './locales/de/analytics.json';
import deNodes from './locales/de/nodes.json';
import dePartnerPages from './locales/de/partner-pages.json';
import deItbid from './locales/de/itbid.json';
import deSeres from './locales/de/seres.json';
import deCloserstillProyecto from './locales/de/closerstill-proyecto.json';
import deValerdata from './locales/de/valerdata.json';
import deAracea from './locales/de/aracea.json';
import deTelenatura from './locales/de/telenatura.json';
import deAerce from './locales/de/aerce.json';
import deUserGuide from './locales/de/userGuide.json';
import deGuide from './locales/de/guide.json';
import deWhitepaper from './locales/de/whitepaper.json';
import deKit from './locales/de/kit.json';
import deDocs from './locales/de/docs.json';
import deChat from './locales/de/chat.json';
import deGreenProcurement from './locales/de/greenProcurement.json';
import deFundamentos from './locales/de/fundamentos.json';
import deCatalogoDatos from './locales/de/catalogoDatos.json';
import deFlujo3Actores from './locales/de/flujo3Actores.json';
import dePoliticasOdrl from './locales/de/politicasOdrl.json';
import deWeb3Dids from './locales/de/web3Dids.json';
import deIAConversacional from './locales/de/iaConversacional.json';
import deConectoresErp from './locales/de/conectoresErp.json';
import deRedGaiaX from './locales/de/redGaiaX.json';
import deAnalyticsBi from './locales/de/analyticsBi.json';
import deMultiSector from './locales/de/multiSector.json';
import deUne0087 from './locales/de/une0087.json';
import deUneRecommendations from './locales/de/uneRecommendations.json';
import deRulebook from './locales/de/rulebook.json';
import deGlossaryUne from './locales/de/glossaryUne.json';
import deTransparency from './locales/de/transparency.json';
import deAdmin from './locales/de/admin.json';

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
import itRequests from './locales/it/requests.json';
import itData from './locales/it/data.json';
import itReports from './locales/it/reports.json';
import itNotifications from './locales/it/notifications.json';
import itAnalytics from './locales/it/analytics.json';
import itNodes from './locales/it/nodes.json';
import itPartnerPages from './locales/it/partner-pages.json';
import itItbid from './locales/it/itbid.json';
import itSeres from './locales/it/seres.json';
import itCloserstillProyecto from './locales/it/closerstill-proyecto.json';
import itValerdata from './locales/it/valerdata.json';
import itAracea from './locales/it/aracea.json';
import itTelenatura from './locales/it/telenatura.json';
import itAerce from './locales/it/aerce.json';
import itArchitecture from './locales/it/architecture.json';
import itUserGuide from './locales/it/userGuide.json';
import itGuide from './locales/it/guide.json';
import itWhitepaper from './locales/it/whitepaper.json';
import itKit from './locales/it/kit.json';
import itDocs from './locales/it/docs.json';
import itChat from './locales/it/chat.json';
import itFundamentos from './locales/it/fundamentos.json';
import itCatalogoDatos from './locales/it/catalogoDatos.json';
import itFlujo3Actores from './locales/it/flujo3Actores.json';
import itPoliticasOdrl from './locales/it/politicasOdrl.json';
import itWeb3Dids from './locales/it/web3Dids.json';
import itIAConversacional from './locales/it/iaConversacional.json';
import itConectoresErp from './locales/it/conectoresErp.json';
import itRedGaiaX from './locales/it/redGaiaX.json';
import itAnalyticsBi from './locales/it/analyticsBi.json';
import itMultiSector from './locales/it/multiSector.json';
import itUne0087 from './locales/it/une0087.json';
import itUneRecommendations from './locales/it/uneRecommendations.json';
import itRulebook from './locales/it/rulebook.json';
import itGlossaryUne from './locales/it/glossaryUne.json';
import itTransparency from './locales/it/transparency.json';
import itAdmin from './locales/it/admin.json';

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
import nlRequests from './locales/nl/requests.json';
import nlData from './locales/nl/data.json';
import nlReports from './locales/nl/reports.json';
import nlNotifications from './locales/nl/notifications.json';
import nlAnalytics from './locales/nl/analytics.json';
import nlNodes from './locales/nl/nodes.json';
import nlPartnerPages from './locales/nl/partner-pages.json';
import nlItbid from './locales/nl/itbid.json';
import nlSeres from './locales/nl/seres.json';
import nlCloserstillProyecto from './locales/nl/closerstill-proyecto.json';
import nlValerdata from './locales/nl/valerdata.json';
import nlAracea from './locales/nl/aracea.json';
import nlTelenatura from './locales/nl/telenatura.json';
import nlAerce from './locales/nl/aerce.json';
import nlArchitecture from './locales/nl/architecture.json';
import nlUserGuide from './locales/nl/userGuide.json';
import nlGuide from './locales/nl/guide.json';
import nlWhitepaper from './locales/nl/whitepaper.json';
import nlKit from './locales/nl/kit.json';
import nlDocs from './locales/nl/docs.json';
import nlChat from './locales/nl/chat.json';
import nlFundamentos from './locales/nl/fundamentos.json';
import nlCatalogoDatos from './locales/nl/catalogoDatos.json';
import nlFlujo3Actores from './locales/nl/flujo3Actores.json';
import nlPoliticasOdrl from './locales/nl/politicasOdrl.json';
import nlWeb3Dids from './locales/nl/web3Dids.json';
import nlIAConversacional from './locales/nl/iaConversacional.json';
import nlConectoresErp from './locales/nl/conectoresErp.json';
import nlRedGaiaX from './locales/nl/redGaiaX.json';
import nlAnalyticsBi from './locales/nl/analyticsBi.json';
import nlMultiSector from './locales/nl/multiSector.json';
import nlUne0087 from './locales/nl/une0087.json';
import nlUneRecommendations from './locales/nl/uneRecommendations.json';
import nlRulebook from './locales/nl/rulebook.json';
import nlGlossaryUne from './locales/nl/glossaryUne.json';
import nlTransparency from './locales/nl/transparency.json';
import nlAdmin from './locales/nl/admin.json';

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
import enRequests from './locales/en/requests.json';
import enData from './locales/en/data.json';
import enReports from './locales/en/reports.json';
import enNotifications from './locales/en/notifications.json';
import enAnalytics from './locales/en/analytics.json';
import enNodes from './locales/en/nodes.json';
import enPartnerPages from './locales/en/partner-pages.json';
import enItbid from './locales/en/itbid.json';
import enSeres from './locales/en/seres.json';
import enCloserstillProyecto from './locales/en/closerstill-proyecto.json';
import enValerdata from './locales/en/valerdata.json';
import enAracea from './locales/en/aracea.json';
import enTelenatura from './locales/en/telenatura.json';
import enAerce from './locales/en/aerce.json';
import enArchitecture from './locales/en/architecture.json';
import enUserGuide from './locales/en/userGuide.json';
import enGuide from './locales/en/guide.json';
import enWhitepaper from './locales/en/whitepaper.json';
import enKit from './locales/en/kit.json';
import enDocs from './locales/en/docs.json';
import enChat from './locales/en/chat.json';
import enFundamentos from './locales/en/fundamentos.json';
import enCatalogoDatos from './locales/en/catalogoDatos.json';
import enFlujo3Actores from './locales/en/flujo3Actores.json';
import enPoliticasOdrl from './locales/en/politicasOdrl.json';
import enWeb3Dids from './locales/en/web3Dids.json';
import enIAConversacional from './locales/en/iaConversacional.json';
import enConectoresErp from './locales/en/conectoresErp.json';
import enRedGaiaX from './locales/en/redGaiaX.json';
import enAnalyticsBi from './locales/en/analyticsBi.json';
import enMultiSector from './locales/en/multiSector.json';
import enUne0087 from './locales/en/une0087.json';
import enUneRecommendations from './locales/en/uneRecommendations.json';
import enRulebook from './locales/en/rulebook.json';
import enGlossaryUne from './locales/en/glossaryUne.json';
import enTransparency from './locales/en/transparency.json';
import enAdmin from './locales/en/admin.json';

// German and Portuguese architecture imports
import deArchitecture from './locales/de/architecture.json';
import ptArchitecture from './locales/pt/architecture.json';

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
        nodes: esNodes,
        'partner-pages': esPartnerPages,
        itbid: esItbid,
        seres: esSeres,
        'closerstill-proyecto': esCloserstillProyecto,
        valerdata: esValerdata,
        aracea: esAracea,
        telenatura: esTelenatura,
        aerce: esAerce,
        architecture: esArchitecture,
        userGuide: esUserGuide,
        guide: esGuide,
        whitepaper: esWhitepaper,
        kit: esKit,
        docs: esDocs,
        chat: esChat,
        fundamentos: esFundamentos,
        catalogoDatos: esCatalogoDatos,
        flujo3Actores: esFlujo3Actores,
        politicasOdrl: esPoliticasOdrl,
        web3Dids: esWeb3Dids,
        iaConversacional: esIAConversacional,
        conectoresErp: esConectoresErp,
        redGaiaX: esRedGaiaX,
        analyticsBi: esAnalyticsBi,
        multiSector: esMultiSector,
        une0087: esUne0087,
        uneRecommendations: esUneRecommendations,
        rulebook: esRulebook,
        glossaryUne: esGlossaryUne,
        transparency: esTransparency,
        notifications: esNotifications,
        reports: esReports,
        data: esData,
        requests: esRequests,
        analytics: esAnalytics,
        admin: esAdmin,
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
        nodes: enNodes,
        'partner-pages': enPartnerPages,
        itbid: enItbid,
        seres: enSeres,
        'closerstill-proyecto': enCloserstillProyecto,
        valerdata: enValerdata,
        aracea: enAracea,
        telenatura: enTelenatura,
        aerce: enAerce,
        architecture: enArchitecture,
        userGuide: enUserGuide,
        guide: enGuide,
        whitepaper: enWhitepaper,
        kit: enKit,
        docs: enDocs,
        chat: enChat,
        fundamentos: enFundamentos,
        catalogoDatos: enCatalogoDatos,
        flujo3Actores: enFlujo3Actores,
        politicasOdrl: enPoliticasOdrl,
        web3Dids: enWeb3Dids,
        iaConversacional: enIAConversacional,
        conectoresErp: enConectoresErp,
        redGaiaX: enRedGaiaX,
        analyticsBi: enAnalyticsBi,
        multiSector: enMultiSector,
        une0087: enUne0087,
        uneRecommendations: enUneRecommendations,
        rulebook: enRulebook,
        glossaryUne: enGlossaryUne,
        transparency: enTransparency,
        notifications: enNotifications,
        reports: enReports,
        data: enData,
        requests: enRequests,
        analytics: enAnalytics,
        admin: enAdmin,
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
        nodes: frNodes,
        'partner-pages': frPartnerPages,
        itbid: frItbid,
        seres: frSeres,
        'closerstill-proyecto': frCloserstillProyecto,
        valerdata: frValerdata,
        aracea: frAracea,
        telenatura: frTelenatura,
        aerce: frAerce,
        architecture: frArchitecture,
        userGuide: frUserGuide,
        guide: frGuide,
        whitepaper: frWhitepaper,
        kit: frKit,
        docs: frDocs,
        chat: frChat,
        greenProcurement: frGreenProcurement,
        fundamentos: frFundamentos,
        catalogoDatos: frCatalogoDatos,
        flujo3Actores: frFlujo3Actores,
        politicasOdrl: frPoliticasOdrl,
        web3Dids: frWeb3Dids,
        iaConversacional: frIAConversacional,
        conectoresErp: frConectoresErp,
        redGaiaX: frRedGaiaX,
        analyticsBi: frAnalyticsBi,
        multiSector: frMultiSector,
        une0087: frUne0087,
        uneRecommendations: frUneRecommendations,
        rulebook: frRulebook,
        glossaryUne: frGlossaryUne,
        transparency: frTransparency,
        notifications: frNotifications,
        reports: frReports,
        data: frData,
        requests: frRequests,
        analytics: frAnalytics,
        admin: frAdmin,
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
        nodes: ptNodes,
        'partner-pages': ptPartnerPages,
        itbid: ptItbid,
        seres: ptSeres,
        'closerstill-proyecto': ptCloserstillProyecto,
        valerdata: ptValerdata,
        aracea: ptAracea,
        telenatura: ptTelenatura,
        aerce: ptAerce,
        architecture: ptArchitecture,
        userGuide: ptUserGuide,
        guide: ptGuide,
        whitepaper: ptWhitepaper,
        kit: ptKit,
        docs: ptDocs,
        chat: ptChat,
        fundamentos: ptFundamentos,
        catalogoDatos: ptCatalogoDatos,
        flujo3Actores: ptFlujo3Actores,
        politicasOdrl: ptPoliticasOdrl,
        web3Dids: ptWeb3Dids,
        iaConversacional: ptIAConversacional,
        conectoresErp: ptConectoresErp,
        redGaiaX: ptRedGaiaX,
        analyticsBi: ptAnalyticsBi,
        multiSector: ptMultiSector,
        une0087: ptUne0087,
        uneRecommendations: ptUneRecommendations,
        rulebook: ptRulebook,
        glossaryUne: ptGlossaryUne,
        transparency: ptTransparency,
        notifications: ptNotifications,
        reports: ptReports,
        data: ptData,
        requests: ptRequests,
        analytics: ptAnalytics,
        admin: ptAdmin,
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
        nodes: deNodes,
        'partner-pages': dePartnerPages,
        itbid: deItbid,
        seres: deSeres,
        'closerstill-proyecto': deCloserstillProyecto,
        valerdata: deValerdata,
        aracea: deAracea,
        telenatura: deTelenatura,
        aerce: deAerce,
        architecture: deArchitecture,
        userGuide: deUserGuide,
        guide: deGuide,
        whitepaper: deWhitepaper,
        kit: deKit,
        docs: deDocs,
        chat: deChat,
        greenProcurement: deGreenProcurement,
        fundamentos: deFundamentos,
        catalogoDatos: deCatalogoDatos,
        flujo3Actores: deFlujo3Actores,
        politicasOdrl: dePoliticasOdrl,
        web3Dids: deWeb3Dids,
        iaConversacional: deIAConversacional,
        conectoresErp: deConectoresErp,
        redGaiaX: deRedGaiaX,
        analyticsBi: deAnalyticsBi,
        multiSector: deMultiSector,
        une0087: deUne0087,
        uneRecommendations: deUneRecommendations,
        rulebook: deRulebook,
        glossaryUne: deGlossaryUne,
        transparency: deTransparency,
        notifications: deNotifications,
        reports: deReports,
        data: deData,
        requests: deRequests,
        analytics: deAnalytics,
        admin: deAdmin,
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
        nodes: itNodes,
        'partner-pages': itPartnerPages,
        itbid: itItbid,
        seres: itSeres,
        'closerstill-proyecto': itCloserstillProyecto,
        valerdata: itValerdata,
        aracea: itAracea,
        telenatura: itTelenatura,
        aerce: itAerce,
        architecture: itArchitecture,
        userGuide: itUserGuide,
        guide: itGuide,
        whitepaper: itWhitepaper,
        kit: itKit,
        docs: itDocs,
        chat: itChat,
        fundamentos: itFundamentos,
        catalogoDatos: itCatalogoDatos,
        flujo3Actores: itFlujo3Actores,
        politicasOdrl: itPoliticasOdrl,
        web3Dids: itWeb3Dids,
        iaConversacional: itIAConversacional,
        conectoresErp: itConectoresErp,
        redGaiaX: itRedGaiaX,
        analyticsBi: itAnalyticsBi,
        multiSector: itMultiSector,
        une0087: itUne0087,
        uneRecommendations: itUneRecommendations,
        rulebook: itRulebook,
        glossaryUne: itGlossaryUne,
        transparency: itTransparency,
        notifications: itNotifications,
        reports: itReports,
        data: itData,
        requests: itRequests,
        analytics: itAnalytics,
        admin: itAdmin,
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
        nodes: nlNodes,
        'partner-pages': nlPartnerPages,
        itbid: nlItbid,
        seres: nlSeres,
        'closerstill-proyecto': nlCloserstillProyecto,
        valerdata: nlValerdata,
        aracea: nlAracea,
        telenatura: nlTelenatura,
        aerce: nlAerce,
        architecture: nlArchitecture,
        userGuide: nlUserGuide,
        guide: nlGuide,
        whitepaper: nlWhitepaper,
        kit: nlKit,
        docs: nlDocs,
        chat: nlChat,
        fundamentos: nlFundamentos,
        catalogoDatos: nlCatalogoDatos,
        flujo3Actores: nlFlujo3Actores,
        politicasOdrl: nlPoliticasOdrl,
        web3Dids: nlWeb3Dids,
        iaConversacional: nlIAConversacional,
        conectoresErp: nlConectoresErp,
        redGaiaX: nlRedGaiaX,
        analyticsBi: nlAnalyticsBi,
        multiSector: nlMultiSector,
        une0087: nlUne0087,
        uneRecommendations: nlUneRecommendations,
        rulebook: nlRulebook,
        glossaryUne: nlGlossaryUne,
        transparency: nlTransparency,
        notifications: nlNotifications,
        reports: nlReports,
        data: nlData,
        requests: nlRequests,
        analytics: nlAnalytics,
        admin: nlAdmin,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'nav', 'landing', 'simulators', 'success', 'catalog', 'services', 'innovation', 'sustainability', 'opportunities', 'models', 'motor', 'syntheticData', 'partnerProducts', 'premiumPartners', 'partners', 'demo-tour', 'settings', 'register', 'contract', 'closerstill', 'catalogDetails', 'greenProcurement', 'diagrams', 'useCases', 'dashboard', 'seres', 'closerstill-proyecto', 'valerdata', 'aracea', 'telenatura', 'aerce', 'architecture', 'userGuide', 'guide', 'whitepaper', 'kit', 'chat', 'fundamentos', 'catalogoDatos', 'flujo3Actores', 'politicasOdrl', 'web3Dids', 'iaConversacional', 'conectoresErp', 'redGaiaX', 'analyticsBi', 'multiSector', 'une0087', 'uneRecommendations', 'rulebook', 'glossaryUne', 'transparency', 'notifications', 'reports', 'data', 'requests', 'analytics', 'admin'],
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
