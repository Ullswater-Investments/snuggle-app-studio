export interface PremiumPartnerKeyStat {
  value: string;
  label: string;
}

export interface EcosystemCompany {
  name: string;
  description: string;
  logo?: string;
}

export interface DataAnalysis {
  summary: string;
  capabilities: string[];
  uniqueValue: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  type: "benchmark" | "index" | "forecast" | "directory" | "capacity" | "risk" | "cost" | "strategy";
}

export interface PremiumPartner {
  id: string;
  name: string;
  fullName: string;
  country: { code: string; flag: string; name: string };
  vertical: string;
  logo?: string;
  
  // A. Contexto de Autoridad (Bio)
  authorityContext: {
    narrative: string;
    keyStats: PremiumPartnerKeyStat[];
    headquarters: string;
  };
  
  // B. Ecosistema de Afiliados
  ecosystem: EcosystemCompany[];
  
  // C. Análisis de Activos de Datos
  dataAnalysis: DataAnalysis;
  
  // D. Catálogo de 10 Casos de Uso
  useCases: UseCase[];
  
  // Metadata
  status: "active" | "coming_soon";
  tier: "founding" | "strategic" | "premium";
}

// ============================================
// PAQUETE 14: NODOS FUNDADORES
// ============================================

export const bmeGermany: PremiumPartner = {
  id: "bme-germany",
  name: "BME",
  fullName: "Bundesverband Materialwirtschaft, Einkauf und Logistik",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Compras, Logística y Supply Chain",
  
  authorityContext: {
    narrative: "La Bundesverband Materialwirtschaft, Einkauf und Logistik (BME) es la 'nave nodriza' de las compras en Europa. Con sede en Eschborn, define los estándares para un volumen de compras de 1,25 billones de euros anuales. Mientras BME España es el puente, BME Alemania es el motor. Organizan el BME Symposium, el mayor evento de procurement del continente. Son la autoridad definitiva en índices de precios industriales y metodologías de ahorro.",
    keyStats: [
      { value: "1,25T€", label: "Volumen de Compras Anuales" },
      { value: "#1", label: "Evento de Procurement en Europa" },
      { value: "9.500+", label: "Profesionales Miembros" }
    ],
    headquarters: "Eschborn, Frankfurt"
  },
  
  ecosystem: [
    { name: "Deutsche Bahn", description: "El mayor comprador de infraestructura de Europa" },
    { name: "Lufthansa", description: "Aviación" },
    { name: "Siemens", description: "Tecnología industrial" },
    { name: "Robert Bosch", description: "Componentes y tecnología" },
    { name: "Thyssenkrupp", description: "Acero e ingeniería" },
    { name: "Fraport", description: "Gestión aeroportuaria" },
    { name: "Deutsche Post DHL", description: "Logística global" },
    { name: "Continental", description: "Automoción" }
  ],
  
  dataAnalysis: {
    summary: "Poseen los datos más profundos sobre salarios en compras, KPIs de eficiencia y índices de materias primas (madera, acero, energía) específicos para la industria DACH.",
    capabilities: [
      "Benchmarks salariales de CPOs",
      "KPIs de eficiencia P2P",
      "Índices de precios industriales",
      "Encuestas de riesgo supply chain"
    ],
    uniqueValue: "Acceso directo a datos agregados del 100% del sector industrial alemán, el motor económico de Europa."
  },
  
  useCases: [
    { id: "mro-index", title: "Índice de Precios de Materiales Indirectos (MRO)", description: "Inflación real en repuestos y consumibles industriales.", type: "index" },
    { id: "cpo-salary", title: "Benchmarks de Salarios de CPO", description: "Remuneración de directivos de compras por volumen de facturación.", type: "benchmark" },
    { id: "savings-kpi", title: "KPIs de Ahorro (Savings)", description: "% medio de ahorro conseguido por categoría de compra en Alemania.", type: "benchmark" },
    { id: "p2p-times", title: "Tiempos de Proceso Purchase-to-Pay (P2P)", description: "Eficiencia administrativa media de empresas alemanas.", type: "benchmark" },
    { id: "energy-cost", title: "Costes de Energía Industrial", description: "Datos de precios pagados por MWh en contratos a largo plazo.", type: "cost" },
    { id: "sc-risk", title: "Barómetro de Riesgo de Cadena de Suministro", description: "Encuesta mensual de interrupciones en supply chain.", type: "risk" },
    { id: "digital-proc", title: "Digitalización en Compras", description: "Tasa de uso de IA y RPA en departamentos de compras.", type: "index" },
    { id: "freight-cost", title: "Costes de Flete (Carretera/Marítimo)", description: "Índices de precios de transporte desde/hacia Alemania.", type: "cost" },
    { id: "category-mgmt", title: "Gestión de Categorías (Category Management)", description: "Estrategias de compra más usadas por commodity.", type: "strategy" },
    { id: "steel-index", title: "Índice de Precios del Acero", description: "Cotizaciones spot y contrato para diferentes grados de acero.", type: "index" }
  ],
  
  status: "active",
  tier: "founding"
};

export const aerospaceValley: PremiumPartner = {
  id: "aerospace-valley",
  name: "Aerospace Valley",
  fullName: "Pôle de Compétitivité Mondial Aéronautique, Espace et Systèmes Embarqués",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Aeroespacial, Espacio y Drones",
  
  authorityContext: {
    narrative: "Con sede entre Toulouse y Burdeos, Aerospace Valley es el clúster aeroespacial más importante del mundo fuera de EE.UU. Es el ecosistema nativo de Airbus. Aquí se diseñan los aviones comerciales, se lanzan satélites y se validan los combustibles de aviación sostenibles (SAF). Manejan datos críticos de certificación aeronáutica, talento en ingeniería y capacidades de ensayo.",
    keyStats: [
      { value: "850+", label: "Empresas Miembro" },
      { value: "120K", label: "Empleos Directos" },
      { value: "#1", label: "Clúster Aeroespacial EU" }
    ],
    headquarters: "Toulouse, Occitania"
  },
  
  ecosystem: [
    { name: "Airbus", description: "Sede mundial" },
    { name: "Dassault Aviation", description: "Jets de negocios y militares - Rafale" },
    { name: "Thales Alenia Space", description: "Satélites" },
    { name: "Safran", description: "Motores y equipamiento" },
    { name: "Liebherr Aerospace", description: "Sistemas de aire" },
    { name: "Latecoere", description: "Aeroestructuras y cableado" },
    { name: "CNES", description: "Agencia Espacial Francesa" },
    { name: "ATR", description: "Aviones regionales turbohélice" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de la soberanía aérea. Datos sobre materiales avanzados, huella de carbono aérea y disponibilidad de ingenieros altamente especializados.",
    capabilities: [
      "Certificaciones EN9100",
      "Capacidad de ensayos estructurales",
      "Stock de materiales críticos",
      "Proyectos de hidrógeno líquido"
    ],
    uniqueValue: "Acceso exclusivo al ecosistema que diseña y fabrica el 50% de los aviones comerciales del mundo."
  },
  
  useCases: [
    { id: "en9100-directory", title: "Directorio de Proveedores EN9100", description: "Base de datos validada de proveedores certificados para vuelo.", type: "directory" },
    { id: "test-bench", title: "Capacidad de Ensayos (Test Benches)", description: "Disponibilidad de túneles de viento y bancos de prueba estructurales.", type: "capacity" },
    { id: "titanium-stock", title: "Stock de Titanio y Aleaciones", description: "Inventarios de materias primas críticas aeroespaciales.", type: "index" },
    { id: "h2-projects", title: "Proyectos de Hidrógeno Líquido", description: "Datos de I+D sobre tanques criogénicos para aviación.", type: "forecast" },
    { id: "earth-obs", title: "Observación de la Tierra (Satélites)", description: "Datos procesados de imágenes satelitales para agricultura/clima.", type: "index" },
    { id: "pred-maint", title: "Mantenimiento Predictivo", description: "Algoritmos entrenados con datos de flotas reales.", type: "forecast" },
    { id: "uam", title: "Movilidad Aérea Urbana (UAM)", description: "Proyectos de taxis aéreos y regulación en la región.", type: "forecast" },
    { id: "carbon-recyc", title: "Reciclaje de Fibra de Carbono", description: "Tecnologías para recuperar composites de aviones desguazados.", type: "capacity" },
    { id: "aero-salaries", title: "Salarios de Ingenieros Aeroespaciales", description: "Benchmarks de coste laboral en Occitania.", type: "benchmark" },
    { id: "green-avionics", title: "Aviónica Verde", description: "Datos de consumo energético de sistemas de a bordo.", type: "index" }
  ],
  
  status: "active",
  tier: "founding"
};

export const foodValley: PremiumPartner = {
  id: "food-valley",
  name: "Food Valley",
  fullName: "Food Valley NL - Agrifood Innovation Ecosystem",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Tecnología Alimentaria y Proteína Alternativa",
  
  authorityContext: {
    narrative: "Alrededor de la Universidad de Wageningen opera Food Valley, el 'Silicon Valley de la comida'. Es el epicentro mundial de la transición proteica y la agricultura de precisión. Aquí es donde empresas como Unilever o Upfield deciden qué comeremos en 2030. Sus datos son vitales para la reformulación de alimentos, la nutrición personalizada y la sostenibilidad agroalimentaria.",
    keyStats: [
      { value: "#1", label: "Hub AgriFood Mundial" },
      { value: "150+", label: "Startups FoodTech" },
      { value: "8.000+", label: "Investigadores" }
    ],
    headquarters: "Wageningen, Gelderland"
  },
  
  ecosystem: [
    { name: "Unilever", description: "Centro de innovación global de alimentos 'Hive'" },
    { name: "Kraft Heinz", description: "Centro de I+D" },
    { name: "FrieslandCampina", description: "Lácteos e ingredientes" },
    { name: "Royal DSM", description: "Ingredientes y biotecnología" },
    { name: "Upfield", description: "Líder mundial en productos plant-based" },
    { name: "KeyGene", description: "Genética molecular de cultivos" },
    { name: "Kikkoman", description: "I+D europeo" },
    { name: "Wageningen University", description: "Partner de conocimiento" }
  ],
  
  dataAnalysis: {
    summary: "Datos científicos sobre propiedades de ingredientes, cultivo de células (carne cultivada) y comportamiento del consumidor hacia nuevas proteínas.",
    capabilities: [
      "Bases de datos de proteínas vegetales",
      "Datos de reformulación de alimentos",
      "Ecosistema de inversión en agricultura celular",
      "Métricas de reducción de desperdicio"
    ],
    uniqueValue: "El único hub que combina ciencia de alimentos de clase mundial con acceso a los mayores productores de alimentos de Europa."
  },
  
  useCases: [
    { id: "plant-protein", title: "Base de Datos de Proteínas Vegetales", description: "Funcionalidad y sabor de aislados de guisante, haba y soja.", type: "directory" },
    { id: "reformulation", title: "Reformulación de Sal y Azúcar", description: "Datos técnicos para reducir aditivos manteniendo la textura.", type: "benchmark" },
    { id: "cultured-meat", title: "Startups de Carne Cultivada", description: "Ecosistema de inversión en agricultura celular.", type: "directory" },
    { id: "food-waste", title: "Desperdicio Alimentario (Food Waste)", description: "Datos de reducción de mermas en procesamiento industrial.", type: "index" },
    { id: "personalized-nutr", title: "Nutrición Personalizada", description: "Algoritmos de dieta basados en datos genéticos/metabólicos.", type: "forecast" },
    { id: "water-footprint", title: "Huella Hídrica de Ingredientes", description: "Litros de agua por gramo de proteína producida.", type: "index" },
    { id: "microbiome", title: "Microbioma", description: "Datos de impacto de prebióticos en la salud intestinal.", type: "forecast" },
    { id: "sust-packaging", title: "Packaging Sostenible", description: "Nuevos materiales biodegradables probados con alimentos reales.", type: "directory" },
    { id: "harvest-robotics", title: "Robótica en Cosecha", description: "Datos de rendimiento de robots recolectores de fruta.", type: "capacity" },
    { id: "flexitarian", title: "Tendencias de Consumo 'Flexitariano'", description: "Análisis de ventas de sustitutos cárnicos en retail.", type: "index" }
  ],
  
  status: "active",
  tier: "founding"
};

export const motorValley: PremiumPartner = {
  id: "motor-valley",
  name: "Motor Valley",
  fullName: "Motor Valley Emilia-Romagna - Distretto dell'Automotive di Lusso",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Automoción de Lujo y Alto Rendimiento",
  
  authorityContext: {
    narrative: "En Emilia-Romaña, el Motor Valley concentra las marcas más deseadas del planeta. No se trata de transporte, se trata de prestaciones extremas. Ferrari, Lamborghini, Maserati, Ducati. Este clúster representa la cúspide de la ingeniería mecánica y el diseño. Para ProcureData, aportan datos sobre materiales compuestos de ultra-alta gama, telemetría y una cadena de suministro artesanal de 'cero defectos'.",
    keyStats: [
      { value: "16.700M€", label: "Facturación Anual" },
      { value: "7", label: "Marcas Icónicas" },
      { value: "190+", label: "Países de Exportación" }
    ],
    headquarters: "Módena, Emilia-Romaña"
  },
  
  ecosystem: [
    { name: "Ferrari", description: "Maranello" },
    { name: "Lamborghini", description: "Sant'Agata Bolognese" },
    { name: "Ducati", description: "Borgo Panigale" },
    { name: "Maserati", description: "Módena" },
    { name: "Pagani Automobili", description: "San Cesario sul Panaro" },
    { name: "Dallara", description: "Chasis de competición - Varano de' Melegari" },
    { name: "Scuderia AlphaTauri (RB)", description: "Fórmula 1 - Faenza" },
    { name: "Energica Motor Company", description: "Motos eléctricas de alto rendimiento" }
  ],
  
  dataAnalysis: {
    summary: "Datos de ingeniería de competición, artesanía industrial (cuero, madera, pintura) y simulación de conducción.",
    capabilities: [
      "Proveedores de fibra de carbono",
      "Telemetría de alto rendimiento",
      "Artesanía de lujo",
      "Impresión 3D de metales"
    ],
    uniqueValue: "El único ecosistema donde el 'cero defectos' no es un objetivo, sino el punto de partida."
  },
  
  useCases: [
    { id: "carbon-fiber", title: "Proveedores de Fibra de Carbono (Autoclave)", description: "Capacidades de producción de piezas estructurales ligeras.", type: "directory" },
    { id: "aero-talent", title: "Talento en Aerodinámica", description: "Disponibilidad de ingenieros de túnel de viento.", type: "capacity" },
    { id: "hp-telemetry", title: "Telemetría de Alto Rendimiento", description: "Datos de sensores en condiciones extremas de pista.", type: "index" },
    { id: "leather-craft", title: "Artesanía del Cuero", description: "Proveedores certificados para tapicería de lujo.", type: "directory" },
    { id: "metal-3d", title: "Impresión 3D de Metal (Titanio/Inconel)", description: "Prototipado rápido de componentes de motor.", type: "capacity" },
    { id: "hd-batteries", title: "Baterías de Alta Descarga", description: "Tecnología de celdas para superdeportivos eléctricos.", type: "forecast" },
    { id: "simulators", title: "Simuladores de Conducción", description: "Horas disponibles en simuladores profesionales (Dallara).", type: "capacity" },
    { id: "5axis-machining", title: "Mecanizado de Precisión 5 Ejes", description: "Talleres capaces de fabricar piezas de motor complejas.", type: "directory" },
    { id: "industrial-tourism", title: "Turismo Industrial", description: "Datos de visitantes a museos y fábricas (economía de experiencia).", type: "index" },
    { id: "classic-resto", title: "Restauración de Clásicos", description: "Base de datos de especialistas en mecánica vintage.", type: "directory" }
  ],
  
  status: "active",
  tier: "founding"
};

export const barcelona22: PremiumPartner = {
  id: "22-barcelona",
  name: "22@",
  fullName: "22@ Barcelona - Distrito de la Innovación",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Smart City, IoT y Economía Digital",
  
  authorityContext: {
    narrative: "El distrito 22@ Barcelona es el laboratorio urbano de Europa. Transformó un barrio industrial (Poblenou) en un distrito de innovación donde conviven grandes tecnológicas y startups. Es un ecosistema físico denso. Sus datos son puramente urbanos: consumo energético de edificios inteligentes, movilidad compartida y talento digital. Es el modelo de 'Distrito de Innovación' que otras ciudades copian.",
    keyStats: [
      { value: "4.500+", label: "Empresas Instaladas" },
      { value: "93K", label: "Trabajadores" },
      { value: "200ha", label: "Distrito de Innovación" }
    ],
    headquarters: "Barcelona, Cataluña"
  },
  
  ecosystem: [
    { name: "Amazon", description: "Hub tecnológico" },
    { name: "Glovo", description: "Sede central - Delivery Hero" },
    { name: "HP", description: "Centro mundial de impresión 3D y gran formato" },
    { name: "Cisco", description: "Centro de coinnovación" },
    { name: "Mediapro", description: "Audiovisual y contenidos" },
    { name: "Adevinta", description: "Marketplaces digitales" },
    { name: "T-Systems", description: "Servicios digitales" },
    { name: "WeWork/Spaces", description: "Alta densidad de espacios flexibles" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de la Smart City. Datos sobre oficinas flexibles, talento tech expatriado y sostenibilidad urbana.",
    capabilities: [
      "Precios de alquiler prime",
      "Demanda de talento tech",
      "Movilidad urbana compartida",
      "Consumo energético distrital"
    ],
    uniqueValue: "El único distrito donde puedes medir en tiempo real el pulso de la economía digital europea."
  },
  
  useCases: [
    { id: "office-prices", title: "Precios de Alquiler de Oficinas (Prime)", description: "Evolución del coste por m² en edificios con certificación LEED/BREEAM.", type: "index" },
    { id: "tech-demand", title: "Demanda de Talento Tech", description: "Vacantes de desarrolladores Full Stack y Data Scientists en Barcelona.", type: "index" },
    { id: "urban-mobility", title: "Movilidad Urbana (Bicing/Motos)", description: "Datos de uso de sistemas de transporte compartido en el distrito.", type: "index" },
    { id: "district-heating", title: "Consumo Energético District Heating", description: "Datos de la red de calor y frío (Districlima) que alimenta al barrio.", type: "cost" },
    { id: "coworking-occ", title: "Ocupación de Coworking", description: "Tasas de disponibilidad de puestos flexibles.", type: "capacity" },
    { id: "startup-census", title: "Ecosistema Startup", description: "Censo de nuevas empresas por tecnología (Fintech, Gaming, IoT).", type: "directory" },
    { id: "tech-events", title: "Eventos Tecnológicos (MWC/ISE)", description: "Impacto económico y datos de visitantes de grandes ferias.", type: "index" },
    { id: "5g-urban", title: "5G Urbano", description: "Mapas de cobertura y pilotos de IoT en mobiliario urbano.", type: "capacity" },
    { id: "commercial-waste", title: "Residuos Comerciales", description: "Gestión de recogida neumática en edificios de oficinas.", type: "index" },
    { id: "expat-salaries", title: "Salarios de Expatriados", description: "Coste de vida y paquetes de compensación para talento internacional.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "founding"
};

// Colección de todos los Premium Partners
export const premiumPartnersData: PremiumPartner[] = [
  bmeGermany,
  aerospaceValley,
  foodValley,
  motorValley,
  barcelona22
];

// Helper para obtener un partner por ID
export const getPremiumPartnerById = (id: string): PremiumPartner | undefined => {
  return premiumPartnersData.find(partner => partner.id === id);
};

// Helper para obtener partners por tier
export const getPremiumPartnersByTier = (tier: PremiumPartner["tier"]): PremiumPartner[] => {
  return premiumPartnersData.filter(partner => partner.tier === tier);
};

// Helper para obtener partners por país
export const getPremiumPartnersByCountry = (countryCode: string): PremiumPartner[] => {
  return premiumPartnersData.filter(partner => partner.country.code === countryCode);
};
