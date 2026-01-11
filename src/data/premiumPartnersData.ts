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
    { id: "shared-mobility", title: "Movilidad Compartida", description: "Datos de uso de bicicletas eléctricas y patinetes en el distrito.", type: "index" },
    { id: "coworking-occupancy", title: "Ocupación de Coworking", description: "Tasa de ocupación de espacios flexibles en tiempo real.", type: "capacity" },
    { id: "energy-consumption", title: "Consumo Energético Distrital", description: "kWh/m² de edificios inteligentes.", type: "benchmark" },
    { id: "expat-talent", title: "Talento Expatriado (Nómadas Digitales)", description: "Flujos migratorios de talento tech hacia Barcelona.", type: "forecast" },
    { id: "startup-funding", title: "Financiación de Startups", description: "Rondas de inversión cerradas por empresas del 22@.", type: "index" },
    { id: "event-density", title: "Eventos Empresariales", description: "Número de eventos tech, meetups y conferencias en el distrito.", type: "capacity" },
    { id: "5g-coverage", title: "Cobertura 5G", description: "Mapa de despliegue de infraestructura 5G.", type: "capacity" },
    { id: "urban-lab", title: "Laboratorio Urbano (Pilots)", description: "Proyectos piloto de Smart City activos en el distrito.", type: "directory" }
  ],
  
  status: "active",
  tier: "founding"
};

// ============================================
// PAQUETE 1: PRIORIDAD INMEDIATA
// ============================================

export const siliconSaxony: PremiumPartner = {
  id: "silicon-saxony",
  name: "Silicon Saxony",
  fullName: "Silicon Saxony e.V. - Europas größter Mikroelektronik-Cluster",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Semiconductores, Microelectrónica y Software",
  
  authorityContext: {
    narrative: "Con sede en Dresde, Silicon Saxony es la red de microelectrónica más grande de Europa y una de las cinco más grandes del mundo. En un momento donde la soberanía de los chips es crítica para la UE, este clúster es el corazón palpitante del hardware europeo. No es solo un grupo de empresas; es un ecosistema completo que abarca desde el diseño de chips (fabless) hasta la producción en fundiciones (foundries) y el software que los hace funcionar.",
    keyStats: [
      { value: "500+", label: "Empresas Miembro" },
      { value: "76K", label: "Empleos en Microelectrónica" },
      { value: "#1", label: "Clúster de Chips en Europa" }
    ],
    headquarters: "Dresde, Sajonia"
  },
  
  ecosystem: [
    { name: "Infineon Technologies", description: "Fabricante de chips" },
    { name: "GlobalFoundries", description: "Fundición de semiconductores" },
    { name: "Bosch", description: "Semiconductores automotrices" },
    { name: "X-FAB", description: "Fundición de señales mixtas" },
    { name: "SAP", description: "Software empresarial" },
    { name: "T-Systems Multimedia Solutions", description: "Servicios IT" },
    { name: "Fraunhofer Institute", description: "Investigación aplicada" },
    { name: "Siltronic", description: "Obleas de silicio" }
  ],
  
  dataAnalysis: {
    summary: "El valor diferencial de este nodo son los datos de capacidad de producción tecnológica y cadena de suministro de materiales críticos (tierras raras, gases nobles). Ofrecen una visión única sobre la salud de la industria tecnológica europea.",
    capabilities: [
      "Capacidad de producción de chips",
      "Lead times de obleas",
      "Demanda de gases industriales",
      "Directorio de IP Cores"
    ],
    uniqueValue: "Acceso exclusivo al ecosistema que produce el 40% de los chips fabricados en Europa, en plena era de soberanía tecnológica."
  },
  
  useCases: [
    { id: "cleanroom-index", title: "Índice de Disponibilidad de Cleanrooms", description: "Metros cuadrados de sala blanca disponibles para alquiler o proyectos piloto en Sajonia.", type: "capacity" },
    { id: "micro-talent", title: "Demanda de Talento en Microelectrónica", description: "Agregado de vacantes abiertas para ingenieros de procesos y diseñadores VLSI.", type: "index" },
    { id: "wafer-leadtimes", title: "Lead Times de Obleas (Wafers)", description: "Tiempos de entrega promedio para obleas de silicio de 200mm y 300mm.", type: "forecast" },
    { id: "gas-consumption", title: "Consumo de Gases Industriales", description: "Datos agregados de demanda de Neón y Helio (indicador de actividad de producción).", type: "index" },
    { id: "packaging-capacity", title: "Capacidad de Empaquetado (Packaging)", description: "Disponibilidad de servicios de 'Backend' para finalización de chips.", type: "capacity" },
    { id: "ip-cores", title: "Directorio de IP Cores", description: "Catálogo de bloques de propiedad intelectual (diseños de circuitos) disponibles para licencia.", type: "directory" },
    { id: "fab-efficiency", title: "Benchmarks de Eficiencia Energética en Fabs", description: "Consumo promedio de kWh por cm² de silicio procesado.", type: "benchmark" },
    { id: "used-equipment", title: "Inventario de Equipos de Segunda Mano", description: "Marketplace de maquinaria de litografía y deposición reacondicionada.", type: "directory" },
    { id: "iot-startups", title: "Mapa de Startups IoT", description: "Radar de nuevas empresas desarrollando hardware conectado en la región.", type: "directory" },
    { id: "design-prices", title: "Índice de Precios de Servicios de Diseño", description: "Tarifas horarias promedio para ingeniería de diseño de chips en Alemania.", type: "cost" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const itsOwl: PremiumPartner = {
  id: "its-owl",
  name: "it's OWL",
  fullName: "Intelligent Technical Systems OstWestfalenLippe",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Industria 4.0 y Sistemas Técnicos Inteligentes",
  
  authorityContext: {
    narrative: "Las siglas significan 'Intelligent Technical Systems OstWestfalenLippe'. Considerado por muchos como la cuna real del concepto Industria 4.0. Ubicado en el corazón industrial de Alemania, este clúster agrupa a los líderes mundiales en automatización industrial y conectividad. Para ProcureData, este es el nodo de la manufactura inteligente y los datos de maquinaria (IIoT).",
    keyStats: [
      { value: "200+", label: "Empresas Miembro" },
      { value: "45K", label: "Empleos en Automatización" },
      { value: "#1", label: "Clúster Industria 4.0" }
    ],
    headquarters: "Paderborn, Renania del Norte-Westfalia"
  },
  
  ecosystem: [
    { name: "Beckhoff Automation", description: "Sistemas de control PC-based" },
    { name: "Phoenix Contact", description: "Conectividad industrial" },
    { name: "WAGO", description: "Tecnología de conexión eléctrica" },
    { name: "Harting", description: "Conectividad industrial pesada" },
    { name: "Miele", description: "Electrodomésticos premium" },
    { name: "Claas", description: "Maquinaria agrícola" },
    { name: "Weidmüller", description: "Electrónica industrial" },
    { name: "Lenze", description: "Automatización de movimiento" }
  ],
  
  dataAnalysis: {
    summary: "Son los dueños del dato de la máquina. Su potencial reside en estandarizar datos sobre componentes de automatización, compatibilidad de sistemas y mantenimiento predictivo industrial.",
    capabilities: [
      "Estándares OPC UA",
      "Lead times de PLCs",
      "Adopción de gemelos digitales",
      "Benchmarks OEE"
    ],
    uniqueValue: "El único ecosistema donde se definen los estándares de comunicación máquina-a-máquina que usará toda la industria europea."
  },
  
  useCases: [
    { id: "opcua-devices", title: "Estándares de Interoperabilidad (OPC UA)", description: "Base de datos de dispositivos certificados para comunicación máquina-a-máquina.", type: "directory" },
    { id: "plc-leadtimes", title: "Lead Times de PLCs Industriales", description: "Tiempos de espera reales para controladores lógicos programables (crítico por escasez).", type: "forecast" },
    { id: "digital-twin-adoption", title: "Índice de Adopción de Gemelos Digitales", description: "% de empresas manufactureras que utilizan Digital Twins por sector.", type: "index" },
    { id: "oee-benchmark", title: "Benchmark de Eficiencia OEE", description: "Datos agregados de 'Overall Equipment Effectiveness' en plantas de ensamblaje alemanas.", type: "benchmark" },
    { id: "safety-catalog", title: "Catálogo de Componentes de Seguridad (Safety)", description: "Listado de relés y sensores de seguridad con certificación SIL3.", type: "directory" },
    { id: "cobot-demand", title: "Demanda de Robots Colaborativos (Cobots)", description: "Tendencias de compra de brazos robóticos ligeros.", type: "forecast" },
    { id: "motor-energy", title: "Consumo Energético de Motores Industriales", description: "Datos de eficiencia real vs. nominal en entornos de fábrica.", type: "benchmark" },
    { id: "maintenance-cost", title: "Coste de Mantenimiento por Activo", description: "Gasto promedio anual en mantenimiento para líneas de producción automatizadas.", type: "cost" },
    { id: "integrator-availability", title: "Disponibilidad de Ingenieros de Automatización", description: "Tasa de ocupación de integradores de sistemas en la región.", type: "capacity" },
    { id: "retrofit-market", title: "Datos de Retrofit", description: "Mercado de kits para actualizar maquinaria antigua con sensores IoT.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const adaci: PremiumPartner = {
  id: "adaci",
  name: "ADACI",
  fullName: "Associazione Italiana Acquisti e Supply Management",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Gestión de Compras y Supply Chain Management",
  
  authorityContext: {
    narrative: "La Associazione Italiana Acquisti e Supply Management (ADACI) es la referencia absoluta para la profesión de compras en Italia. Con más de 50 años de historia, conecta a los Directores de Compras (CPOs) de las mayores industrias italianas. Su autoridad reside en la certificación profesional y en ser el termómetro de la economía industrial italiana desde la perspectiva del comprador.",
    keyStats: [
      { value: "50+", label: "Años de Historia" },
      { value: "3.000+", label: "Profesionales Miembro" },
      { value: "#1", label: "Asociación de Compras en Italia" }
    ],
    headquarters: "Milán, Lombardía"
  },
  
  ecosystem: [
    { name: "Leonardo", description: "Aeroespacial y Defensa" },
    { name: "Eni", description: "Energía" },
    { name: "Barilla", description: "Alimentación" },
    { name: "Ferrero", description: "Alimentación" },
    { name: "Prysmian Group", description: "Cables y sistemas" },
    { name: "Fincantieri", description: "Construcción naval" },
    { name: "Luxottica", description: "Gafas/Moda" },
    { name: "Ferrovie dello Stato Italiane", description: "Transporte" }
  ],
  
  dataAnalysis: {
    summary: "ADACI posee datos 'blandos' (soft data) sobre comportamiento de proveedores, salarios y tendencias de negociación, y datos 'duros' sobre precios de mercado en el sur de Europa.",
    capabilities: [
      "Monitor de riesgo país Italia",
      "Plazos de pago reales (DPO)",
      "Salarios de compras",
      "Base de datos ESG"
    ],
    uniqueValue: "La única fuente de datos agregados sobre el comportamiento real de la cadena de suministro italiana, el segundo sector manufacturero de Europa."
  },
  
  useCases: [
    { id: "italy-risk", title: "Monitor de Riesgo País (Italia)", description: "Índice de estabilidad de la cadena de suministro italiana post-pandemia.", type: "risk" },
    { id: "dpo-italy", title: "Plazos de Pago Reales", description: "Datos agregados de 'Días de Pago a Proveedores' (DPO) por sector industrial en Italia.", type: "benchmark" },
    { id: "procurement-salaries", title: "Salarios de Profesionales de Compras", description: "Encuesta anual de remuneración por rol (Buyer, Category Manager, CPO).", type: "benchmark" },
    { id: "transport-prices", title: "Índice de Precios de Transporte Nacional", description: "Costes medios de flete por carretera dentro de la península italiana.", type: "index" },
    { id: "esg-suppliers", title: "Base de Datos de Proveedores Calificados ESG", description: "Registro de PYMES italianas con auditorías de sostenibilidad aprobadas.", type: "directory" },
    { id: "mro-inflation", title: "Inflación en Cesta de Compra Industrial", description: "Variación de precios de una cesta estándar de materiales indirectos (MRO).", type: "index" },
    { id: "eprocurement-adoption", title: "Adopción de e-Procurement", description: "Ranking de plataformas de licitación más usadas en Italia.", type: "index" },
    { id: "consulting-rates", title: "Costes de Consultoría y Servicios", description: "Tarifas día promedio para consultores de gestión en Milán y Roma.", type: "cost" },
    { id: "dispute-rate", title: "Tasa de Disputas con Proveedores", description: "% de facturas bloqueadas o disputadas por sector.", type: "risk" },
    { id: "district-resilience", title: "Índice de Resiliencia de Distritos Industriales", description: "Salud financiera agregada de proveedores en clústeres clave (ej. textil, cerámica).", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const cdaf: PremiumPartner = {
  id: "cdaf",
  name: "CDAF",
  fullName: "Conseil National des Achats - Compagnie des Dirigeants et Acheteurs de France",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Liderazgo en Compras y Estrategia",
  
  authorityContext: {
    narrative: "El Conseil National des Achats (CDAF) representa el poder de compra de Francia. Organizan 'La Nuit des Achats', el evento más prestigioso del sector. A diferencia de otros, el CDAF tiene un enfoque muy fuerte en la compra responsable y la relación estratégica con proveedores, impulsado por regulaciones francesas estrictas como la Loi Sapin II.",
    keyStats: [
      { value: "4.000+", label: "Profesionales Miembro" },
      { value: "#1", label: "Evento de Compras en Francia" },
      { value: "70+", label: "Años de Historia" }
    ],
    headquarters: "París, Île-de-France"
  },
  
  ecosystem: [
    { name: "L'Oréal", description: "Cosmética" },
    { name: "SNCF", description: "Ferrocarriles" },
    { name: "Orange", description: "Telecomunicaciones" },
    { name: "Sanofi", description: "Farmacéutica" },
    { name: "Air France", description: "Transporte" },
    { name: "Thales", description: "Tecnología/Defensa" },
    { name: "EDF", description: "Energía" },
    { name: "Société Générale", description: "Banca" }
  ],
  
  dataAnalysis: {
    summary: "Son líderes en datos sobre Responsabilidad Social Corporativa (RSC) en la cadena de suministro y cumplimiento normativo. Sus datos ayudan a validar si un proveedor es 'seguro' éticamente.",
    capabilities: [
      "Barómetro de compras responsables",
      "Índice de relación cliente-proveedor",
      "Huella de carbono Scope 3",
      "Maturidad digital de compras"
    ],
    uniqueValue: "La fuente más completa sobre compra responsable y relación ética con proveedores en la economía francesa."
  },
  
  useCases: [
    { id: "responsible-procurement", title: "Barómetro de Compras Responsables", description: "% de gasto dirigido a proveedores del sector protegido (discapacidad) o PYMES locales.", type: "index" },
    { id: "relationship-index", title: "Índice de Relación Cliente-Proveedor", description: "Puntuación de la calidad de la relación comercial en grandes cuentas francesas.", type: "benchmark" },
    { id: "energy-costs-fr", title: "Costes de Energía para Industrias en Francia", description: "Datos de impacto de tarifas eléctricas en costes de producción.", type: "cost" },
    { id: "digital-maturity", title: "Maturidad Digital de Departamentos de Compras", description: "Autoevaluación agregada de digitalización en empresas del CAC40.", type: "index" },
    { id: "mediation-stats", title: "Base de Datos de Mediación", description: "Estadísticas anónimas sobre conflictos resueltos por el mediador de empresas.", type: "risk" },
    { id: "it-consulting-rates", title: "Tarifas de Servicios Intelectuales", description: "Benchmarks de precios para contratación de servicios IT y consultoría en París.", type: "cost" },
    { id: "scope3-emissions", title: "Huella de Carbono Scope 3", description: "Datos sectoriales de emisiones indirectas de la cadena de suministro francesa.", type: "index" },
    { id: "open-innovation", title: "Innovación Abierta (Open Innovation)", description: "Número de proyectos de co-innovación firmados entre grandes grupos y startups.", type: "forecast" },
    { id: "payment-terms-fr", title: "Plazos de Pago Sector Público vs Privado", description: "Comparativa de tiempos de cobro en Francia.", type: "benchmark" },
    { id: "made-in-france", title: "Índice de 'Made in France'", description: "% de componentes de origen nacional en diferentes categorías de compra.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const minalogic: PremiumPartner = {
  id: "minalogic",
  name: "Minalogic",
  fullName: "Minalogic - Pôle de Compétitivité Mondial Technologies du Numérique",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Tecnologías Digitales, Fotónica y Software",
  
  authorityContext: {
    narrative: "Ubicado en la región de Auvergne-Rhône-Alpes (Grenoble/Lyon/Saint-Etienne), Minalogic es un polo de competitividad mundial. Se les conoce a veces como el 'Silicon Valley de la imagen y los sensores'. Es un ecosistema denso donde convergen la microelectrónica, la óptica/fotónica y el software. Es vital para datos de I+D profundo (Deep Tech).",
    keyStats: [
      { value: "400+", label: "Empresas Miembro" },
      { value: "50K", label: "Empleos Tech" },
      { value: "#1", label: "Polo de Fotónica en Europa" }
    ],
    headquarters: "Grenoble, Auvergne-Rhône-Alpes"
  },
  
  ecosystem: [
    { name: "STMicroelectronics", description: "Semiconductores" },
    { name: "Soitec", description: "Materiales semiconductores" },
    { name: "Schneider Electric", description: "Gestión de energía" },
    { name: "CEA", description: "Commissariat à l'énergie atomique (Investigación)" },
    { name: "Capgemini", description: "Consultoría IT" },
    { name: "Lynred", description: "Detectores infrarrojos" },
    { name: "Teledyne e2v", description: "Semiconductores de imagen" },
    { name: "Verkor", description: "Baterías de alto rendimiento" }
  ],
  
  dataAnalysis: {
    summary: "Ofrecen datos únicos sobre transferencia tecnológica y capacidades de sensores. Si alguien necesita saber qué tecnología de visión artificial estará disponible en 3 años, los datos están aquí.",
    capabilities: [
      "Capacidades de sensores de imagen",
      "Patentes en fotónica",
      "Laboratorios de pruebas",
      "Directorio de startups IA"
    ],
    uniqueValue: "El único hub europeo que combina microelectrónica, fotónica y software en un ecosistema integrado de Deep Tech."
  },
  
  useCases: [
    { id: "sensor-capabilities", title: "Capacidades de Sensores de Imagen", description: "Base de datos de especificaciones técnicas de sensores desarrollados en el clúster.", type: "directory" },
    { id: "photonics-patents", title: "Mapa de Patentes en Fotónica", description: "Análisis de actividad de patentes europeas en tecnologías de luz/láser.", type: "index" },
    { id: "test-labs", title: "Disponibilidad de Laboratorios de Pruebas", description: "Agenda de centros disponibles para validación de óptica y microelectrónica.", type: "capacity" },
    { id: "ai-startups", title: "Directorio de Startups de IA Aplicada", description: "Empresas emergentes de Inteligencia Artificial para industria (B2B).", type: "directory" },
    { id: "rd-projects", title: "Oferta de Proyectos de I+D Colaborativos", description: "Listado de consorcios buscando socios europeos.", type: "directory" },
    { id: "deeptech-salaries", title: "Benchmark de Salarios en Deep Tech", description: "Remuneración de perfiles altamente especializados (ej. ingenieros ópticos).", type: "benchmark" },
    { id: "rare-earth-optics", title: "Consumo de Tierras Raras en Óptica", description: "Datos de demanda de materiales críticos para lentes y sensores.", type: "index" },
    { id: "industrial-cybersec", title: "Tendencias en Ciberseguridad Industrial", description: "Soluciones de seguridad hardware desarrolladas en la región.", type: "forecast" },
    { id: "battery-capacity", title: "Capacidad de Producción de Baterías", description: "Datos del ecosistema emergente de gigafactorías en la región.", type: "capacity" },
    { id: "trl-index", title: "Índice de Madurez Tecnológica (TRL)", description: "Clasificación de tecnologías disponibles según su nivel de preparación (Technology Readiness Level).", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 2: EJE BENELUX
// ============================================

export const nevi: PremiumPartner = {
  id: "nevi",
  name: "NEVI",
  fullName: "Nederlandse Vereniging voor Inkoopmanagement",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Gestión de Compras y Liderazgo",
  
  authorityContext: {
    narrative: "La Nederlandse Vereniging voor Inkoopmanagement (NEVI) es una de las asociaciones de compras más grandes y sofisticadas del mundo. En los Países Bajos, el comercio está en el ADN, y NEVI es quien profesionaliza ese instinto. Es el estándar de oro en educación y certificación de compradores en el norte de Europa. Para ProcureData, este nodo aporta datos sobre las prácticas comerciales más avanzadas y éticas del continente.",
    keyStats: [
      { value: "6.000+", label: "Profesionales Miembro" },
      { value: "#1", label: "Certificación Compras Benelux" },
      { value: "40+", label: "Años de Historia" }
    ],
    headquarters: "Zoetermeer, Holanda Meridional"
  },
  
  ecosystem: [
    { name: "Shell", description: "Energía" },
    { name: "Philips", description: "Tecnología de la salud" },
    { name: "ASML", description: "Semiconductores" },
    { name: "Heineken", description: "Gran consumo" },
    { name: "Unilever", description: "Gran consumo" },
    { name: "KLM", description: "Aerolínea" },
    { name: "KPN", description: "Telecomunicaciones" },
    { name: "AkzoNobel", description: "Pinturas y recubrimientos" }
  ],
  
  dataAnalysis: {
    summary: "NEVI maneja datos excepcionales sobre capital humano en compras, tarifas de contratación temporal (muy relevante en NL) y madurez digital. Sus datos ayudan a entender 'cuánto cuesta comprar' en un mercado maduro.",
    capabilities: [
      "Tarifas de freelance (ZZP)",
      "Salarios Benelux",
      "KPIs de SRM",
      "Adopción e-invoicing"
    ],
    uniqueValue: "La fuente más completa sobre el coste real del talento de compras en uno de los mercados más maduros del mundo."
  },
  
  useCases: [
    { id: "zzp-rates", title: "Índice de Tarifas de Contratación Temporal (ZZP)", description: "Coste hora promedio de freelances expertos en compras y supply chain.", type: "cost" },
    { id: "benelux-salaries", title: "Salarios de Procurement en Benelux", description: "Benchmarks salariales detallados por sector y años de experiencia.", type: "benchmark" },
    { id: "srm-kpis", title: "KPIs de Desempeño de Proveedores (SRM)", description: "Métricas promedio de evaluación de proveedores en empresas holandesas.", type: "benchmark" },
    { id: "training-costs", title: "Costes de Formación Corporativa", description: "Gasto medio por empleado en capacitación de habilidades comerciales.", type: "cost" },
    { id: "e-invoicing", title: "Tasa de Adopción de Facturación Electrónica", description: "Porcentaje de facturas procesadas sin intervención humana (Touchless invoice).", type: "index" },
    { id: "green-procurement", title: "Índice de Sostenibilidad en Compras Públicas", description: "Datos sobre el cumplimiento de criterios verdes en licitaciones holandesas.", type: "index" },
    { id: "fm-prices", title: "Precios de Servicios de Facility Management", description: "Costes por m² de limpieza y seguridad en oficinas de Ámsterdam/Róterdam.", type: "cost" },
    { id: "talent-scarcity", title: "Barómetro de Escasez de Talento", description: "Perfiles de compras más difíciles de cubrir en el mercado laboral actual.", type: "risk" },
    { id: "sme-payment", title: "Plazos de Pago a PYMEs", description: "Datos reales de cumplimiento de la ley holandesa de pagos a 30 días.", type: "benchmark" },
    { id: "erp-licensing", title: "Costes de Licenciamiento de Software ERP", description: "Gasto promedio en suites de compras (SAP Ariba, Coupa) por tamaño de empresa.", type: "cost" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const brainportEindhoven: PremiumPartner = {
  id: "brainport-eindhoven",
  name: "Brainport Eindhoven",
  fullName: "Brainport Development - Europe's Smartest Square Kilometer",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Alta Tecnología y Semiconductores",
  
  authorityContext: {
    narrative: "Conocido como 'el kilómetro cuadrado más inteligente de Europa'. Brainport Eindhoven es el ecosistema construido alrededor de gigantes como Philips y ASML. Es un modelo único de 'Innovación Abierta' donde las empresas comparten I+D pre-competitivo. Este nodo es vital para la soberanía tecnológica europea: aquí se fabrican las máquinas que fabrican los chips del mundo.",
    keyStats: [
      { value: "€120B", label: "Facturación Anual Región" },
      { value: "#1", label: "Litografía EUV Mundial" },
      { value: "45K+", label: "Ingenieros High-Tech" }
    ],
    headquarters: "Eindhoven, Brabante Septentrional"
  },
  
  ecosystem: [
    { name: "ASML", description: "Líder mundial en litografía" },
    { name: "Philips", description: "HealthTech" },
    { name: "NXP Semiconductors", description: "Chips automotrices" },
    { name: "VDL Groep", description: "Manufactura industrial y autobuses" },
    { name: "DAF Trucks", description: "Vehículos pesados" },
    { name: "Thermo Fisher Scientific", description: "Microscopía electrónica" },
    { name: "Signify", description: "Iluminación inteligente" },
    { name: "Sioux Technologies", description: "Ingeniería de software/hardware" }
  ],
  
  dataAnalysis: {
    summary: "Dueños de datos sobre Mecatrónica de alta precisión, fotónica y patentes. Si buscas proveedores capaces de trabajar a escala nanométrica, los datos están aquí.",
    capabilities: [
      "Mecanizado ultra-precisión",
      "Patentes high-tech",
      "Cleanrooms disponibles",
      "Cadena litografía"
    ],
    uniqueValue: "El único ecosistema del mundo donde se diseñan y fabrican las máquinas EUV que hacen posible los chips más avanzados del planeta."
  },
  
  useCases: [
    { id: "ultra-precision", title: "Capacidad de Mecanizado de Ultra-Precisión", description: "Disponibilidad de talleres capaces de tolerancias sub-micrométricas.", type: "capacity" },
    { id: "patent-activity", title: "Índice de Actividad de Patentes High-Tech", description: "Nuevos registros de propiedad intelectual en fotónica y materiales.", type: "index" },
    { id: "cleanroom-availability", title: "Disponibilidad de Salas Limpias (Cleanrooms)", description: "Metros cuadrados libres clasificados por nivel ISO (1-9).", type: "capacity" },
    { id: "embedded-sw-cost", title: "Coste de Ingeniería de Software Embebido", description: "Tarifas hora para desarrolladores de sistemas críticos (C/C++).", type: "cost" },
    { id: "litho-supply-chain", title: "Cadena de Suministro de Litografía", description: "Datos de riesgo en proveedores Tier-2/Tier-3 de componentes para máquinas de chips.", type: "risk" },
    { id: "advanced-optics", title: "Demanda de Óptica Avanzada", description: "Necesidades de lentes y espejos de alta gama para industria.", type: "forecast" },
    { id: "deeptech-startups", title: "Startups de Deep Tech", description: "Radar de nuevas empresas en robótica y sensores cuánticos.", type: "directory" },
    { id: "exotic-materials", title: "Residuos de Materiales Exóticos", description: "Disponibilidad de metales raros recuperados de procesos de manufactura.", type: "directory" },
    { id: "datacenter-energy", title: "Consumo Energético de Data Centers Regionales", description: "Eficiencia y capacidad disponible en la región de Brabante.", type: "capacity" },
    { id: "component-traceability", title: "Trazabilidad de Componentes Críticos", description: "Datos de origen para materiales sensibles en la cadena de suministro high-tech.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const portRotterdam: PremiumPartner = {
  id: "port-rotterdam",
  name: "Port of Rotterdam",
  fullName: "Port of Rotterdam Authority - SmartPort Initiative",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Logística, Energía y Química",
  
  authorityContext: {
    narrative: "El Puerto de Róterdam no es solo el puerto más grande de Europa; es una plataforma digital masiva. A través de su iniciativa SmartPort, están construyendo un 'Gemelo Digital' de toda la operación portuaria. Es la puerta de entrada de mercancías al continente y un hub energético crucial (petróleo, gas y ahora hidrógeno).",
    keyStats: [
      { value: "470M", label: "Toneladas/Año" },
      { value: "#1", label: "Puerto de Europa" },
      { value: "42km", label: "Extensión del Puerto" }
    ],
    headquarters: "Róterdam, Holanda Meridional"
  },
  
  ecosystem: [
    { name: "Maersk", description: "Naviera" },
    { name: "ECT (Hutchison Ports)", description: "Operador de terminales" },
    { name: "Shell", description: "Refinería y Energía" },
    { name: "BP", description: "Refinería" },
    { name: "Vopak", description: "Almacenamiento de tanques" },
    { name: "Damen Shipyards", description: "Construcción naval" },
    { name: "Stolt-Nielsen", description: "Transporte de químicos" },
    { name: "Neste", description: "Combustibles renovables" }
  ],
  
  dataAnalysis: {
    summary: "El 'oro' de este partner son los datos de flujos logísticos, tiempos de espera (dwell times) y transición energética (bunkering de nuevos combustibles).",
    capabilities: [
      "Tiempos de permanencia",
      "Precios bunkering",
      "Capacidad de tanques",
      "Flujos de hidrógeno"
    ],
    uniqueValue: "El único puerto europeo con un gemelo digital completo y datos en tiempo real de toda la cadena logística continental."
  },
  
  useCases: [
    { id: "container-dwell", title: "Tiempos de Permanencia de Contenedores", description: "Promedio de días que un contenedor pasa en terminal antes de salir (indicador de congestión).", type: "index" },
    { id: "bunker-prices", title: "Índice de Precios de Bunkering (Combustible)", description: "Coste real del fueloil, GNL y metanol en el puerto.", type: "index" },
    { id: "tank-capacity", title: "Capacidad de Almacenamiento de Tanques", description: "% de ocupación de tanques para crudo y químicos en tiempo real.", type: "capacity" },
    { id: "empty-containers", title: "Disponibilidad de Contenedores Vacíos", description: "Stock de equipos listos para exportación.", type: "capacity" },
    { id: "hydrogen-imports", title: "Volúmenes de Importación de Hidrógeno", description: "Datos de flujo de vectores energéticos verdes.", type: "forecast" },
    { id: "co2-per-teu", title: "Emisiones de CO2 por TEU", description: "Huella de carbono promedio del movimiento de contenedores en el puerto.", type: "index" },
    { id: "truck-wait", title: "Tiempos de Espera de Camiones", description: "Datos de congestión en las puertas de las terminales.", type: "index" },
    { id: "barge-rates", title: "Tarifas de Barcazas Fluviales", description: "Costes de transporte hacia el interior de Europa (Rhin-Ruhr).", type: "cost" },
    { id: "vessel-eta", title: "Predicción de Llegadas de Buques (ETA)", description: "Datos de precisión de horarios de buques Deep Sea.", type: "forecast" },
    { id: "port-security", title: "Seguridad Portuaria", description: "Estadísticas anonimizadas de incidentes y mercancías peligrosas.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const agoria: PremiumPartner = {
  id: "agoria",
  name: "Agoria",
  fullName: "Agoria - Federatie van de Technologische Industrie",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Tecnología Industrial y Manufactura",
  
  authorityContext: {
    narrative: "Agoria es la federación de la industria tecnológica en Bélgica. Representan el puente entre la manufactura tradicional y el mundo digital. Con un enfoque muy fuerte en la Industria 4.0 y la economía circular, Agoria agrupa a empresas que facturan más de 100.000 millones de euros. Son expertos en datos sobre el mercado laboral técnico y digitalización industrial.",
    keyStats: [
      { value: "2.000+", label: "Empresas Miembro" },
      { value: "€100B+", label: "Facturación Agregada" },
      { value: "320K", label: "Empleos Representados" }
    ],
    headquarters: "Bruselas, Bélgica"
  },
  
  ecosystem: [
    { name: "Umicore", description: "Materiales y reciclaje" },
    { name: "Solvay", description: "Química avanzada" },
    { name: "Barco", description: "Tecnología de visualización" },
    { name: "Bekaert", description: "Transformación de alambre de acero" },
    { name: "John Cockerill", description: "Ingeniería y defensa" },
    { name: "Siemens Belgium", description: "Automatización" },
    { name: "Sabca", description: "Aeroespacial" },
    { name: "Sonaca", description: "Aeroespacial" }
  ],
  
  dataAnalysis: {
    summary: "Sus datos más valiosos giran en torno a la escasez de talento digital, costes laborales industriales (Bélgica tiene costes altos, la productividad es clave) y reciclaje de materiales (liderazgo de Umicore).",
    capabilities: [
      "Coste laboral tecnológico",
      "Ciberseguridad industrial",
      "Materiales reciclados",
      "Adopción IA manufactura"
    ],
    uniqueValue: "La única federación europea que combina datos de coste laboral premium con liderazgo en economía circular y urban mining."
  },
  
  useCases: [
    { id: "tech-labor-cost", title: "Índice de Coste Laboral Tecnológico", description: "Salario hora cargado (incl. impuestos) para ingenieros en Bélgica.", type: "cost" },
    { id: "ot-cybersec", title: "Madurez de Ciberseguridad Industrial", description: "% de empresas manufactureras con protocolos OT seguros.", type: "index" },
    { id: "recycled-materials", title: "Disponibilidad de Materiales Reciclados", description: "Oferta de metales preciosos recuperados (urban mining).", type: "directory" },
    { id: "rd-investment", title: "Inversión en I+D por Sector", description: "Datos agregados de gasto privado en innovación tecnológica.", type: "index" },
    { id: "ai-manufacturing", title: "Adopción de IA en Manufactura", description: "Casos de uso reales desplegados en plantas belgas.", type: "index" },
    { id: "am-capacity", title: "Capacidad de Impresión 3D Industrial", description: "Disponibilidad de máquinas de Additive Manufacturing para servicios.", type: "capacity" },
    { id: "fleet-electrification", title: "Datos de Movilidad Corporativa", description: "Electrificación de flotas de vehículos de empresa (muy relevante fiscalmente en BE).", type: "index" },
    { id: "hightech-exports", title: "Exportaciones de Alta Tecnología", description: "Flujos comerciales de tecnología belga hacia fuera de la UE.", type: "index" },
    { id: "digital-competitiveness", title: "Barómetro de Competitividad Digital", description: "Comparativa de productividad digital vs. países vecinos.", type: "benchmark" },
    { id: "lca-experts", title: "Directorio de Expertos en Economía Circular", description: "Consultoras e ingenierías especializadas en Life Cycle Assessment (LCA).", type: "directory" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const antwerpChemical: PremiumPartner = {
  id: "antwerp-chemical",
  name: "Antwerp Chemical Cluster",
  fullName: "Port of Antwerp - Europe's Largest Integrated Chemical Cluster",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Industria Química y Procesos",
  
  authorityContext: {
    narrative: "El Clúster Químico de Amberes es el segundo más grande del mundo después de Houston (Texas). Lo que lo hace único para ProcureData es su nivel de integración extrema: las empresas están conectadas físicamente por tuberías (pipelines), compartiendo vapor, energía y materias primas. Es el laboratorio perfecto para datos de simbiosis industrial y eficiencia energética.",
    keyStats: [
      { value: "#2", label: "Clúster Químico Mundial" },
      { value: "60+", label: "Plantas de Producción" },
      { value: "€50B", label: "Inversión en Capacidad" }
    ],
    headquarters: "Amberes, Flandes"
  },
  
  ecosystem: [
    { name: "BASF Antwerpen", description: "El mayor sitio químico integrado de Europa" },
    { name: "ExxonMobil Chemical", description: "Refino y química" },
    { name: "TotalEnergies", description: "Refino y petroquímica" },
    { name: "INEOS", description: "Química" },
    { name: "Bayer", description: "Agricultura y salud" },
    { name: "Evonik", description: "Química especial" },
    { name: "Air Liquide", description: "Gases industriales" },
    { name: "Covestro", description: "Polímeros" }
  ],
  
  dataAnalysis: {
    summary: "Datos 'hardcore' de industria de procesos. Flujos de materias primas, consumo energético masivo y seguridad de procesos. Información crítica para entender la base de la pirámide de suministro industrial de Europa.",
    capabilities: [
      "Flujos de etileno/propileno",
      "Redes de vapor industrial",
      "Gestión residuos químicos",
      "Calendario turnarounds"
    ],
    uniqueValue: "El único clúster químico europeo con datos de simbiosis industrial real: pipelines compartidos, vapor y energía entre plantas."
  },
  
  useCases: [
    { id: "ethylene-flows", title: "Flujos de Etileno y Propileno", description: "Datos de volumen transportado por la red de pipelines ARG.", type: "index" },
    { id: "steam-availability", title: "Disponibilidad de Vapor Industrial", description: "Capacidad excedente de redes de vapor para nuevas plantas.", type: "capacity" },
    { id: "chemical-waste", title: "Gestión de Residuos Químicos", description: "Volúmenes y tipos de residuos procesados para recuperación.", type: "index" },
    { id: "plastic-prices", title: "Índice de Precios de Materias Primas Plásticas", description: "Costes spot de polímeros básicos en el hub de Amberes.", type: "index" },
    { id: "liquid-storage", title: "Capacidad de Almacenamiento de Químicos Líquidos", description: "Disponibilidad en terminales especializadas (ADPO, LBC).", type: "capacity" },
    { id: "water-usage", title: "Consumo de Agua Industrial", description: "Datos de eficiencia hídrica y uso de agua de proceso.", type: "benchmark" },
    { id: "turnarounds", title: "Paradas de Mantenimiento (Turnarounds)", description: "Calendario agregado de paradas planificadas (afecta a suministro).", type: "forecast" },
    { id: "hazmat-rail", title: "Capacidad de Transporte Ferroviario de Mercancías Peligrosas", description: "Disponibilidad de slots y vagones especializados.", type: "capacity" },
    { id: "nox-sox-emissions", title: "Emisiones de NOx y SOx", description: "Datos agregados de calidad del aire industrial.", type: "index" },
    { id: "process-safety", title: "Seguridad de Procesos", description: "Estadísticas anonimizadas de incidentes Tier 1 y Tier 2 (Process Safety).", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 3: POTENCIAS INDUSTRIALES
// ============================================

export const vda: PremiumPartner = {
  id: "vda",
  name: "VDA",
  fullName: "Verband der Automobilindustrie",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Automoción y Movilidad",
  
  authorityContext: {
    narrative: "La Verband der Automobilindustrie (VDA) es posiblemente la asociación industrial más poderosa de Europa. No solo representan a marcas como BMW o Mercedes-Benz; definen el 'lenguaje' de la calidad automotriz mundial. Sus estándares (VDA 6.3, TISAX) son obligatorios para cualquier proveedor que quiera vender una tuerca a un coche alemán. Para ProcureData, este nodo es la autoridad suprema en calidad y ciberseguridad automotriz.",
    keyStats: [
      { value: "€500B+", label: "Facturación Anual Sector" },
      { value: "800K+", label: "Empleos Directos" },
      { value: "#1", label: "Exportador Auto Mundial" }
    ],
    headquarters: "Berlín, Alemania"
  },
  
  ecosystem: [
    { name: "Volkswagen Group", description: "OEM" },
    { name: "Mercedes-Benz", description: "OEM" },
    { name: "BMW Group", description: "OEM" },
    { name: "Robert Bosch", description: "Mayor proveedor mundial" },
    { name: "Continental", description: "Neumáticos y tecnología" },
    { name: "ZF Friedrichshafen", description: "Transmisiones y chasis" },
    { name: "Mahle", description: "Componentes de motor" },
    { name: "Hella", description: "Iluminación y electrónica" }
  ],
  
  dataAnalysis: {
    summary: "Dueños de los datos de auditoría de calidad, seguridad de la información (TISAX) y electrificación. Sus datos permiten filtrar proveedores 'aptos' de 'no aptos' con una precisión quirúrgica.",
    capabilities: [
      "Certificación TISAX",
      "Capacidad baterías EV",
      "Índice calidad PPM",
      "Green Steel tracking"
    ],
    uniqueValue: "La única fuente que define quién puede y quién no puede vender a la industria automotriz alemana, la más exigente del mundo."
  },
  
  useCases: [
    { id: "tisax-status", title: "Estado de Certificación TISAX", description: "Base de datos de proveedores que cumplen con los estándares de seguridad de información (anti-espionaje industrial).", type: "directory" },
    { id: "ev-battery-capacity", title: "Capacidad de Producción de Baterías EV", description: "Previsiones de GWh disponibles en la cadena de suministro alemana.", type: "capacity" },
    { id: "ppm-quality", title: "Índice de Calidad de Proveedores (PPM)", description: "Datos agregados de partes defectuosas por millón en componentes electrónicos vs. mecánicos.", type: "benchmark" },
    { id: "green-steel", title: "Huella de Carbono del Acero Automotriz", description: "Datos de emisiones de CO2 del acero utilizado en chasis (Green Steel).", type: "index" },
    { id: "charging-infra", title: "Infraestructura de Carga", description: "Datos de despliegue de puntos de carga rápida en instalaciones industriales.", type: "capacity" },
    { id: "autonomous-adoption", title: "Adopción de Conducción Autónoma", description: "Estadísticas de integración de sensores LiDAR en nuevos modelos.", type: "forecast" },
    { id: "chip-shortage", title: "Escasez de Semiconductores Auto", description: "Monitor de plazos de entrega para microcontroladores específicos de automoción.", type: "risk" },
    { id: "inbound-logistics", title: "Costes Logísticos Inbound", description: "Benchmarks de coste de transporte de componentes a línea de montaje.", type: "cost" },
    { id: "elv-recycling", title: "Reciclabilidad de Vehículos", description: "Datos sobre tasas de recuperación de materiales al final de la vida útil (ELV).", type: "index" },
    { id: "euro7-compliance", title: "Cumplimiento de Normativa Euro 7", description: "Datos de preparación tecnológica de proveedores de sistemas de escape.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const vci: PremiumPartner = {
  id: "vci",
  name: "VCI",
  fullName: "Verband der Chemischen Industrie",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Industria Química y Farmacéutica",
  
  authorityContext: {
    narrative: "La Verband der Chemischen Industrie (VCI) representa a la tercera industria química más grande del mundo. Con sede en Frankfurt, agrupa a gigantes que son la base de casi todas las demás cadenas de suministro (desde plásticos hasta medicamentos). Su enfoque actual es la transformación climática y la química circular (Chemistry 4.0).",
    keyStats: [
      { value: "€230B", label: "Facturación Anual" },
      { value: "500K+", label: "Empleos en Química" },
      { value: "#3", label: "Industria Química Mundial" }
    ],
    headquarters: "Frankfurt, Hesse"
  },
  
  ecosystem: [
    { name: "BASF", description: "La mayor empresa química del mundo" },
    { name: "Bayer", description: "Ciencias de la vida" },
    { name: "Henkel", description: "Adhesivos y consumo" },
    { name: "Merck KGaA", description: "Ciencia y tecnología" },
    { name: "Evonik", description: "Química especial" },
    { name: "Covestro", description: "Polímeros de alto rendimiento" },
    { name: "Lanxess", description: "Aditivos" },
    { name: "Boehringer Ingelheim", description: "Farmacéutica" }
  ],
  
  dataAnalysis: {
    summary: "Datos críticos sobre cumplimiento regulatorio (REACH), consumo energético intensivo y seguridad de procesos. Son el termómetro de la producción industrial europea: si la química baja, toda la industria baja.",
    capabilities: [
      "Compliance REACH",
      "Precios químicos básicos",
      "Consumo gas industrial",
      "Reciclaje químico"
    ],
    uniqueValue: "El termómetro de la industria europea: cuando la química alemana se mueve, toda la economía siente el impacto."
  },
  
  useCases: [
    { id: "reach-compliance", title: "Compliance REACH", description: "Base de datos de sustancias registradas y autorizadas para uso en la UE.", type: "directory" },
    { id: "basic-chemical-prices", title: "Índice de Precios de Químicos Básicos", description: "Costes de etileno, benceno y metanol en el mercado alemán.", type: "index" },
    { id: "gas-consumption", title: "Consumo de Gas Natural Industrial", description: "Datos de demanda energética del sector (crítico para seguridad energética).", type: "index" },
    { id: "bioplastics-supply", title: "Disponibilidad de Bioplásticos", description: "Oferta de polímeros derivados de biomasa vs. fósiles.", type: "capacity" },
    { id: "chemical-recycling", title: "Capacidad de Reciclaje Químico", description: "Plantas activas capaces de descomponer plásticos en materias primas.", type: "capacity" },
    { id: "rd-investment-chem", title: "Inversión en I+D Químico", description: "Gasto agregado en investigación de nuevos materiales.", type: "index" },
    { id: "hazmat-logistics", title: "Logística de Mercancías Peligrosas", description: "Datos de seguridad en transporte ferroviario y fluvial de químicos.", type: "risk" },
    { id: "ghg-scope1", title: "Emisiones de Gases de Efecto Invernadero (Scope 1)", description: "Datos de descarbonización de plantas de producción.", type: "index" },
    { id: "hydrogen-prices", title: "Precios de Hidrógeno Gris vs. Verde", description: "Diferencial de costes para la transición energética.", type: "cost" },
    { id: "plant-safety", title: "Seguridad Laboral en Plantas", description: "Estadísticas de accidentes industriales (Lost Time Injury Rate).", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const medicalValley: PremiumPartner = {
  id: "medical-valley",
  name: "Medical Valley EMN",
  fullName: "Medical Valley Europäische Metropolregion Nürnberg",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Tecnología Médica y Salud Digital",
  
  authorityContext: {
    narrative: "Ubicado en el área metropolitana de Núremberg/Erlangen, Medical Valley es un clúster de excelencia mundial. Es el hogar de Siemens Healthineers y un ecosistema denso de investigación universitaria y startups. Aquí se desarrollan los escáneres, resonancias y software de salud del futuro. Para ProcureData, aportan la validación clínica y estándares de datos médicos (GDPR sanitario).",
    keyStats: [
      { value: "500+", label: "Empresas MedTech" },
      { value: "65K", label: "Empleos en Salud" },
      { value: "#1", label: "Clúster MedTech Alemania" }
    ],
    headquarters: "Erlangen, Baviera"
  },
  
  ecosystem: [
    { name: "Siemens Healthineers", description: "Imagen médica y diagnóstico" },
    { name: "Fraunhofer IIS", description: "Investigación, inventores del MP3 y sensores médicos" },
    { name: "Adidas", description: "Wearables y salud deportiva" },
    { name: "Ziehm Imaging", description: "Rayos X móviles" },
    { name: "Corscience", description: "Desfibrilación y monitoreo" },
    { name: "Universitätsklinikum Erlangen", description: "Hospital universitario líder" },
    { name: "WaveLight", description: "Láser oftalmológico" },
    { name: "Brainlab", description: "Software de cirugía" }
  ],
  
  dataAnalysis: {
    summary: "Expertos en datos clínicos, aprobación regulatoria (MDR) y sensores de salud. Ofrecen un entorno seguro para compartir datos de pacientes anonimizados para entrenamiento de IA.",
    capabilities: [
      "Tiempos certificación MDR",
      "Datasets médicos IA",
      "Adopción DiGA",
      "Interoperabilidad FHIR"
    ],
    uniqueValue: "El único clúster europeo con acceso a datos clínicos reales anonimizados para entrenamiento de IA médica en un marco regulatorio seguro."
  },
  
  useCases: [
    { id: "mdr-certification", title: "Tiempos de Certificación MDR", description: "Datos reales de duración del proceso de aprobación bajo la nueva regulación europea.", type: "benchmark" },
    { id: "medical-images", title: "Banco de Imágenes Médicas (Anonimizado)", description: "Datasets de Rayos X y RM para entrenamiento de algoritmos de IA.", type: "directory" },
    { id: "diga-usage", title: "Uso de Apps de Salud Digital (DiGA)", description: "Estadísticas de prescripción y reembolso de apps médicas en Alemania.", type: "index" },
    { id: "fhir-adoption", title: "Interoperabilidad Hospitalaria (HL7/FHIR)", description: "Grado de adopción de estándares de datos en hospitales alemanes.", type: "index" },
    { id: "medtech-prices", title: "Precios de Equipamiento Médico", description: "Benchmarks de coste de adquisición de TACs y resonancias.", type: "cost" },
    { id: "clinical-trials", title: "Ensayos Clínicos Disponibles", description: "Mapa de estudios abiertos para reclutamiento de pacientes en la región.", type: "directory" },
    { id: "wearable-data", title: "Datos de Sensores Wearable", description: "Métricas agregadas de actividad física y constantes vitales (población sana).", type: "index" },
    { id: "iomt-security", title: "Ciberseguridad en Dispositivos Médicos", description: "Vulnerabilidades detectadas en equipos conectados (IoMT).", type: "risk" },
    { id: "surgical-robotics", title: "Robótica Quirúrgica", description: "Datos de utilización y tiempos de quirófano con asistencia robótica.", type: "capacity" },
    { id: "ehealth-startups", title: "Startups de eHealth", description: "Radar de innovación en telemedicina y diagnóstico remoto.", type: "directory" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const aerce: PremiumPartner = {
  id: "aerce",
  name: "AERCE",
  fullName: "Asociación Española de Profesionales de Compras, Contratación y Aprovisionamientos",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Compras y Aprovisionamiento",
  
  authorityContext: {
    narrative: "La Asociación Española de Profesionales de Compras (AERCE) es el referente en España. Con más de 30 años de historia, certifica a los compradores del IBEX 35 y conecta el mercado español con Latinoamérica. Su valor estratégico radica en su profunda conexión con sectores como la construcción, la energía y el turismo, motores de la economía española.",
    keyStats: [
      { value: "2.000+", label: "Profesionales Miembro" },
      { value: "30+", label: "Años de Historia" },
      { value: "#1", label: "Asociación Compras España" }
    ],
    headquarters: "Madrid, España"
  },
  
  ecosystem: [
    { name: "Repsol", description: "Energía" },
    { name: "Telefónica", description: "Telecomunicaciones" },
    { name: "Inditex", description: "Retail/Moda" },
    { name: "Iberdrola", description: "Energía renovable" },
    { name: "Mercadona", description: "Distribución" },
    { name: "Ferrovial", description: "Infraestructuras" },
    { name: "CaixaBank", description: "Servicios financieros" },
    { name: "Cepsa", description: "Energía/Química" }
  ],
  
  dataAnalysis: {
    summary: "AERCE maneja datos clave sobre salarios en España, costes energéticos y riesgo de proveedores en el mercado hispano. Son fundamentales para entender la estructura de costes en el sur de Europa.",
    capabilities: [
      "Barómetro compras España",
      "Salarios por CCAA",
      "Plazos pago reales",
      "Riesgo LATAM"
    ],
    uniqueValue: "El único termómetro fiable del coste de comprar en España y el puente de datos hacia el mercado latinoamericano."
  },
  
  useCases: [
    { id: "spain-barometer", title: "Barómetro de Compras España", description: "Encuesta mensual sobre intenciones de compra y niveles de stock (similar al PMI).", type: "index" },
    { id: "ccaa-salaries", title: "Salarios de Compradores por CCAA", description: "Diferencias salariales entre Madrid, Cataluña y País Vasco.", type: "benchmark" },
    { id: "payment-terms-es", title: "Plazos de Pago Reales (Ley Crea y Crece)", description: "Datos de cumplimiento de pagos a 60 días en empresas españolas.", type: "benchmark" },
    { id: "fleet-costs", title: "Costes de Flota Corporativa", description: "Renting y gestión de vehículos de empresa en España.", type: "cost" },
    { id: "electricity-prices", title: "Tarifas Eléctricas Industriales", description: "Impacto del 'tope al gas' y evolución del precio MWh para industria.", type: "cost" },
    { id: "sme-digitalization", title: "Digitalización de Compras en PYMEs", description: "Nivel de adopción de ERPs y factura electrónica en empresas medianas.", type: "index" },
    { id: "cleaning-security", title: "Precios de Servicios de Limpieza y Seguridad", description: "Convenios colectivos y repercusión en costes de servicios.", type: "cost" },
    { id: "latam-risk", title: "Riesgo de Cadena de Suministro LATAM", description: "Datos de volatilidad en proveedores de América Latina conectados con España.", type: "risk" },
    { id: "women-procurement", title: "Mujeres en Compras", description: "Estadísticas de diversidad y liderazgo femenino en departamentos de compras.", type: "index" },
    { id: "construction-materials", title: "Índice de Precios de Materiales de Construcción", description: "Evolución de costes para obras civiles y edificación en España.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const gaiaCluster: PremiumPartner = {
  id: "gaia-cluster",
  name: "GAIA",
  fullName: "Clúster de Industrias de Conocimiento y Tecnología del País Vasco",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Industria 4.0, Electrónica y TIC",
  
  authorityContext: {
    narrative: "El Clúster GAIA (País Vasco) es el cerebro digital de la industria española. Representa la convergencia entre la electrónica, la informática y la maquinaria herramienta avanzada. En una región con una densidad industrial comparable a Alemania, GAIA lidera la transformación digital (TEIC) y la ciberseguridad industrial.",
    keyStats: [
      { value: "300+", label: "Empresas Miembro" },
      { value: "€4B+", label: "Facturación Agregada" },
      { value: "25K+", label: "Empleos TIC" }
    ],
    headquarters: "Bilbao, País Vasco"
  },
  
  ecosystem: [
    { name: "Ingeteam", description: "Electrónica de potencia" },
    { name: "Sener", description: "Ingeniería y aeroespacial" },
    { name: "CAF", description: "Ferrocarriles" },
    { name: "Euskaltel (Grupo MásMóvil)", description: "Telecomunicaciones" },
    { name: "Ibermática (Ayesa)", description: "Servicios IT" },
    { name: "Versia", description: "Digitalización" },
    { name: "LKS Next", description: "Consultoría tecnológica" },
    { name: "Spyro", description: "Software ERP industrial" }
  ],
  
  dataAnalysis: {
    summary: "Proveen datos sobre madurez digital industrial, ciberseguridad OT (Operational Technology) y talento tecnológico. Son el enlace para digitalizar la 'fábrica' real.",
    capabilities: [
      "Madurez Industria 4.0",
      "Ciberseguridad OT",
      "5G privado industrial",
      "Visión artificial"
    ],
    uniqueValue: "El único clúster español con capacidad de medir la madurez digital real de la industria y conectarla con la ciberseguridad OT."
  },
  
  useCases: [
    { id: "digital-maturity-i40", title: "Índice de Madurez Digital (Industria 4.0)", description: "Autoevaluación agregada de plantas industriales vascas.", type: "index" },
    { id: "basque-tic-salaries", title: "Salarios de Perfiles TIC en País Vasco", description: "Coste de desarrolladores y expertos en ciberseguridad en la región.", type: "benchmark" },
    { id: "ot-incidents", title: "Incidentes de Ciberseguridad Industrial", description: "Estadísticas anónimas de ataques a redes OT/SCADA.", type: "risk" },
    { id: "private-5g", title: "Adopción de 5G Privado", description: "Despliegue de redes móviles privadas en entornos fabriles.", type: "index" },
    { id: "machine-vision", title: "Oferta de Soluciones de Visión Artificial", description: "Catálogo de integradores locales para control de calidad.", type: "directory" },
    { id: "datacenter-pue", title: "Consumo Energético de Centros de Datos", description: "Eficiencia (PUE) de infraestructuras IT en el norte de España.", type: "benchmark" },
    { id: "industrial-xr", title: "Gamificación en Industria", description: "Uso de RV/RA para formación de operarios y mantenimiento.", type: "index" },
    { id: "cloud-spending", title: "Gasto en Cloud Computing", description: "Tendencias de migración a la nube en empresas industriales.", type: "index" },
    { id: "blockchain-traceability", title: "Trazabilidad Blockchain", description: "Proyectos activos de certificación de origen mediante DLT.", type: "directory" },
    { id: "smart-grids", title: "Smart Grids y Almacenamiento", description: "Datos de integración de renovables en redes eléctricas inteligentes locales.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 4: AUTOMOCIÓN LATINA Y DEEP TECH
// ============================================

export const anfia: PremiumPartner = {
  id: "anfia",
  name: "ANFIA",
  fullName: "Associazione Nazionale Filiera Industria Automobilistica",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Automoción y Diseño Industrial",
  
  authorityContext: {
    narrative: "Con sede en Turín, ANFIA representa el alma del diseño y la manufactura automotriz italiana. A diferencia de la VDA alemana (centrada en volumen y proceso), ANFIA brilla en diseño, carrocería y componentes de alto rendimiento. Representa a toda la cadena de valor de marcas icónicas como Fiat, Alfa Romeo y Lancia (bajo el paraguas Stellantis) y a los carroceros legendarios.",
    keyStats: [
      { value: "270+", label: "Empresas Miembro" },
      { value: "€60B", label: "Facturación Sector" },
      { value: "Turín", label: "Capital del Diseño Auto" }
    ],
    headquarters: "Turín, Piamonte"
  },
  
  ecosystem: [
    { name: "Stellantis", description: "Fabricante OEM - Fiat/Alfa Romeo/Maserati" },
    { name: "Brembo", description: "Sistemas de frenado de alto rendimiento" },
    { name: "Pirelli", description: "Neumáticos" },
    { name: "Magneti Marelli", description: "Componentes avanzados" },
    { name: "Iveco Group", description: "Vehículos industriales y autobuses" },
    { name: "Pininfarina", description: "Diseño y carrocería" },
    { name: "Sogefi", description: "Componentes de suspensión/filtros" },
    { name: "Landi Renzo", description: "Sistemas de gas y movilidad alternativa" }
  ],
  
  dataAnalysis: {
    summary: "Poseen datos críticos sobre diseño industrial, homologación de vehículos y la transición a combustibles alternativos (Italia es líder en gas vehicular y ahora hidrógeno).",
    capabilities: [
      "Datos de matriculación granular",
      "Homologación vehicular",
      "Diseño industrial Turín",
      "Combustibles alternativos GLP/GNC"
    ],
    uniqueValue: "El único ecosistema donde el diseño automotriz italiano de clase mundial se combina con expertise en movilidad alternativa."
  },
  
  useCases: [
    { id: "registration-volumes", title: "Volúmenes de Matriculación por Región", description: "Datos granulares de ventas de vehículos comerciales y pasajeros en Italia.", type: "index" },
    { id: "brake-components", title: "Índice de Precios de Componentes de Freno", description: "Costes medios de discos y pastillas cerámicas de alto rendimiento.", type: "index" },
    { id: "design-capacity", title: "Capacidad de Diseño (Carroceros)", description: "Disponibilidad de horas de ingeniería en estudios de diseño de Turín.", type: "capacity" },
    { id: "alt-fuels-adoption", title: "Adopción de GLP/GNC/Hidrógeno", description: "Estadísticas de conversión y venta de vehículos de gas (especialidad italiana).", type: "index" },
    { id: "auto-exports", title: "Exportación de Componentes Auto", description: "Flujos de piezas 'Made in Italy' hacia fábricas alemanas y francesas.", type: "index" },
    { id: "homologation-data", title: "Datos de Homologación", description: "Tiempos y costes promedio para certificar nuevos modelos en Italia.", type: "benchmark" },
    { id: "electric-buses", title: "Producción de Autobuses Eléctricos", description: "Capacidad de fabricación de transporte público cero emisiones.", type: "capacity" },
    { id: "mech-engineering-talent", title: "Talento en Ingeniería Mecánica", description: "Disponibilidad de graduados del Politécnico de Turín.", type: "capacity" },
    { id: "tire-recycling", title: "Reciclaje de Neumáticos (PFU)", description: "Datos de gestión y valorización de neumáticos fuera de uso.", type: "index" },
    { id: "tier2-barometer", title: "Barómetro de la Cadena de Suministro", description: "Encuesta trimestral de sentimiento económico de los proveedores Tier-2.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const pfa: PremiumPartner = {
  id: "pfa",
  name: "PFA",
  fullName: "Plateforme Automobile",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Automoción y Movilidad del Futuro",
  
  authorityContext: {
    narrative: "La Plateforme Automobile (PFA) es la voz unificada de la industria francesa. Reúne a los fabricantes (Renault, Stellantis) y a los proveedores. Su enfoque actual es la soberanía industrial y la electrificación masiva. Gestionan la estrategia nacional del 'Vehículo del Futuro' y coordinan la transición de los históricos clústeres diésel hacia el hidrógeno y las baterías.",
    keyStats: [
      { value: "4.000+", label: "Empresas en la Filière" },
      { value: "400K", label: "Empleos Directos" },
      { value: "#2", label: "Industria Auto en Europa" }
    ],
    headquarters: "París, Île-de-France"
  },
  
  ecosystem: [
    { name: "Renault Group", description: "OEM" },
    { name: "Stellantis", description: "OEM - Peugeot/Citroën/DS" },
    { name: "Michelin", description: "Neumáticos y movilidad" },
    { name: "Valeo", description: "Tecnología y electrificación" },
    { name: "Forvia (Faurecia)", description: "Interiores y movilidad limpia" },
    { name: "Plastic Omnium (OPmobility)", description: "Módulos y sistemas de hidrógeno" },
    { name: "Toyota Motor Manufacturing France", description: "Fábrica Valenciennes" },
    { name: "Hutchinson", description: "Materiales y aislamiento" }
  ],
  
  dataAnalysis: {
    summary: "El valor diferencial de PFA son los datos sobre I+D en hidrógeno, gigafactorías de baterías (en el norte de Francia) y digitalización del cockpit.",
    capabilities: [
      "Corredores hidrógeno H2",
      "Battery Valley francés",
      "Cockpit del futuro",
      "Reconversión laboral"
    ],
    uniqueValue: "El nodo que coordina la mayor transformación industrial de Francia: de motores térmicos a movilidad eléctrica e hidrógeno."
  },
  
  useCases: [
    { id: "h2-stations", title: "Despliegue de Estaciones de Hidrógeno", description: "Mapa de corredores de H2 para transporte pesado en Francia.", type: "directory" },
    { id: "gigafactory-capacity", title: "Capacidad de Gigafactorías (ACC, Verkor)", description: "Previsión de GWh disponibles en el 'Battery Valley' francés.", type: "forecast" },
    { id: "battery-materials", title: "Precios de Materias Primas para Baterías", description: "Índices de coste de Litio y Cobalto en el mercado francés.", type: "index" },
    { id: "cockpit-trends", title: "Tendencias en 'Cockpit del Futuro'", description: "Datos sobre integración de pantallas y asistentes de voz en vehículos.", type: "forecast" },
    { id: "ev-battery-recycling", title: "Reciclaje de Baterías EV", description: "Capacidad instalada para recuperar metales de baterías usadas.", type: "capacity" },
    { id: "workforce-transition", title: "Empleo en la Transición Auto", description: "Datos de reconversión de trabajadores de motores térmicos a eléctricos.", type: "index" },
    { id: "lightweight-materials", title: "Innovación en Materiales Ligeros", description: "Uso de plásticos y composites para reducir peso (clave para autonomía EV).", type: "index" },
    { id: "electric-lcv", title: "Producción de Vehículos Comerciales Ligeros (Vans)", description: "Volúmenes de furgonetas eléctricas (Francia es líder).", type: "capacity" },
    { id: "maas-startups", title: "Startups de Movilidad (MaaS)", description: "Ecosistema de empresas de carsharing y micromovilidad en París.", type: "directory" },
    { id: "inbound-carbon", title: "Huella de Carbono de Logística Inbound", description: "Emisiones asociadas al transporte de piezas a fábricas francesas.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const federchimica: PremiumPartner = {
  id: "federchimica",
  name: "Federchimica",
  fullName: "Federazione Nazionale dell'Industria Chimica",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Industria Química y Farmacéutica",
  
  authorityContext: {
    narrative: "Federchimica representa a un sector sutil pero poderoso. Italia es líder europeo en química fina, ingredientes farmacéuticos activos (APIs) y cosmética. Mientras Alemania domina el volumen, Italia domina la especialización y el nicho de alta calidad. Federchimica agrupa a 1.400 empresas, muchas de ellas PYMEs familiares líderes mundiales en su segmento.",
    keyStats: [
      { value: "1.400+", label: "Empresas Miembro" },
      { value: "€56B", label: "Facturación Sector" },
      { value: "#3", label: "Química EU" }
    ],
    headquarters: "Milán, Lombardía"
  },
  
  ecosystem: [
    { name: "Mapei", description: "Adhesivos y productos para construcción" },
    { name: "Versalis (Eni)", description: "Química básica y plásticos" },
    { name: "Bracco", description: "Imagen diagnóstica y farmacia" },
    { name: "Zambon", description: "Farmacéutica" },
    { name: "RadiciGroup", description: "Polímeros y fibras sintéticas" },
    { name: "Menarini", description: "Farmacéutica" },
    { name: "Solvay Italia", description: "Química" },
    { name: "Lamberti", description: "Especialidades químicas" }
  ],
  
  dataAnalysis: {
    summary: "Son la fuente definitiva para datos de química para la construcción, ingredientes cosméticos y bioplásticos.",
    capabilities: [
      "APIs farmacéuticos",
      "Ingredientes cosméticos",
      "Bioplásticos pioneros",
      "Química fina de nicho"
    ],
    uniqueValue: "El único hub químico europeo especializado en productos de alto valor: APIs, cosmética y bioplásticos Made in Italy."
  },
  
  useCases: [
    { id: "api-exports", title: "Exportación de APIs Farmacéuticos", description: "Volúmenes de principios activos exportados a EE.UU. y Alemania.", type: "index" },
    { id: "cosmetic-ingredients", title: "Tendencias en Ingredientes Cosméticos", description: "Demanda de componentes naturales para la industria de la belleza (Milán es hub cosmético).", type: "forecast" },
    { id: "adhesive-prices", title: "Índice de Precios de Adhesivos Industriales", description: "Costes de insumos clave para el sector construcción.", type: "index" },
    { id: "bioplastics-capacity", title: "Producción de Bioplásticos", description: "Capacidad de fabricación de polímeros biodegradables (Italia es pionera).", type: "capacity" },
    { id: "fine-chem-energy", title: "Consumo de Energía en Química Fina", description: "Datos de eficiencia energética en reactores discontinuos (batch).", type: "benchmark" },
    { id: "chemical-transport", title: "Seguridad en Transporte de Químicos", description: "Estadísticas de logística segura por carretera en Italia.", type: "risk" },
    { id: "textile-recycling", title: "Economía Circular Textil", description: "Datos de reciclaje químico de fibras sintéticas (nylon/poliéster).", type: "index" },
    { id: "agrochemicals", title: "Innovación en Agroquímicos", description: "Nuevos fertilizantes y bioestimulantes registrados.", type: "directory" },
    { id: "medical-gases", title: "Gases Medicinales", description: "Disponibilidad de oxígeno y gases hospitalarios.", type: "capacity" },
    { id: "chemistry-employment", title: "Empleo en Química", description: "Perfiles técnicos y salarios en el sector químico italiano (alta cualificación).", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const packagingValley: PremiumPartner = {
  id: "packaging-valley",
  name: "Packaging Valley",
  fullName: "Distretto del Packaging Automatico di Bologna",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Maquinaria Automática y Envasado",
  
  authorityContext: {
    narrative: "Ubicado en Bolonia (Emilia-Romaña), el Packaging Valley es una anomalía industrial: la mayor concentración mundial de fabricantes de maquinaria de envasado automático. Facturan más de 8.000 millones de euros y exportan el 80%. Si compras una pastilla, un cigarrillo, una bolsita de té o una barra de chocolate en cualquier lugar del mundo, probablemente fue envasada por una máquina diseñada aquí.",
    keyStats: [
      { value: "€8B+", label: "Facturación Anual" },
      { value: "80%", label: "Exportación" },
      { value: "#1", label: "Packaging Automático Mundial" }
    ],
    headquarters: "Bolonia, Emilia-Romaña"
  },
  
  ecosystem: [
    { name: "IMA Group", description: "Líder mundial en envasado farmacéutico/té" },
    { name: "Coesia", description: "Soluciones industriales y envasado" },
    { name: "Marchesini Group", description: "Envasado cosmético y farmacéutico" },
    { name: "Sacmi", description: "Maquinaria para cerámica y bebidas" },
    { name: "GD (Coesia)", description: "Maquinaria para tabaco" },
    { name: "Aetna Group (Robopac)", description: "Embalaje final de línea" },
    { name: "Tetra Pak", description: "Centro de I+D en Módena" },
    { name: "Datalogic", description: "Sensores y lectura de códigos de barras" }
  ],
  
  dataAnalysis: {
    summary: "Datos de bienes de equipo (Capex). Proveen inteligencia sobre tiempos de entrega de maquinaria compleja, tendencias en materiales de envasado sostenibles y servitización (maquinaria como servicio).",
    capabilities: [
      "Lead times maquinaria",
      "Packaging sostenible",
      "Servitización pay-per-pack",
      "Serialización farmacéutica"
    ],
    uniqueValue: "El único ecosistema donde puedes medir la inversión industrial global: si Bologna vende más máquinas, el mundo está produciendo más."
  },
  
  useCases: [
    { id: "packaging-lead-times", title: "Lead Times de Maquinaria de Envasado", description: "Tiempos de espera actuales para líneas de blíster farmacéutico (indicador de inversión global).", type: "index" },
    { id: "paper-vs-plastic", title: "Adopción de Papel vs. Plástico", description: "Estadísticas de máquinas vendidas adaptadas a nuevos materiales sostenibles.", type: "index" },
    { id: "predictive-packaging", title: "Mantenimiento Predictivo en Packaging", description: "Datos agregados de fallos comunes en motores y servos.", type: "forecast" },
    { id: "oee-speed", title: "Velocidad de Producción (OEE)", description: "Benchmarks de velocidad (piezas/minuto) por sector (farma vs. comida).", type: "benchmark" },
    { id: "asia-exports", title: "Exportación de Maquinaria a Asia", description: "Flujos comerciales hacia China e India (indicador de industrialización ajena).", type: "index" },
    { id: "spare-parts-prices", title: "Precios de Repuestos Críticos", description: "Coste y disponibilidad de piezas de desgaste.", type: "cost" },
    { id: "vision-integration", title: "Integración de Visión Artificial", description: "% de líneas de envasado con control de calidad automatizado.", type: "index" },
    { id: "energy-per-pack", title: "Consumo Energético de Líneas de Envasado", description: "Datos de eficiencia kWh/producto envasado.", type: "benchmark" },
    { id: "servitization", title: "Servitización", description: "Tendencias en contratos de 'Pay-per-pack' vs. venta de maquinaria.", type: "forecast" },
    { id: "serialization", title: "Trazabilidad Farmacéutica (Serialization)", description: "Datos sobre cumplimiento de normativas de serialización global.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const systematicParis: PremiumPartner = {
  id: "systematic-paris",
  name: "Systematic Paris-Region",
  fullName: "Pôle de Compétitivité Systematic Paris-Region",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Deep Tech, IA y Ciberseguridad",
  
  authorityContext: {
    narrative: "Systematic Paris-Region es el clúster europeo de Deep Tech. Con sede en la región de París, conecta el software, la óptica y la electrónica. Es donde las grandes corporaciones francesas y el estado definen los estándares de soberanía digital, ciberseguridad e Inteligencia Artificial. Es el contrapeso europeo a Silicon Valley en B2B.",
    keyStats: [
      { value: "1.000+", label: "Miembros" },
      { value: "€3.5B", label: "I+D Anual" },
      { value: "#1", label: "Deep Tech EU" }
    ],
    headquarters: "París, Île-de-France"
  },
  
  ecosystem: [
    { name: "Thales", description: "Defensa y Seguridad Digital" },
    { name: "Dassault Systèmes", description: "Software 3D y Gemelos Digitales" },
    { name: "Atos (Eviden)", description: "Supercomputación y Ciberseguridad" },
    { name: "Orange", description: "Telecomunicaciones" },
    { name: "Renault Group", description: "Vehículo autónomo" },
    { name: "Capgemini", description: "Consultoría e Ingeniería" },
    { name: "Nokia", description: "Redes e infraestructura - sede París" },
    { name: "OVHcloud", description: "Nube soberana europea" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de la confianza digital. Datos sobre amenazas cibernéticas, capacidad de cómputo (HPC) y desarrollo de código abierto industrial.",
    capabilities: [
      "Ciberinteligencia industrial",
      "HPC y computación cuántica",
      "IA empresarial",
      "Soberanía cloud"
    ],
    uniqueValue: "El único ecosistema europeo donde la defensa nacional, la IA y la nube soberana convergen para definir el futuro digital del continente."
  },
  
  useCases: [
    { id: "threat-radar", title: "Radar de Amenazas Cibernéticas", description: "Datos agregados de ataques repelidos en infraestructuras críticas francesas.", type: "risk" },
    { id: "digital-twins-use", title: "Uso de Gemelos Digitales (Digital Twins)", description: "Casos de uso en urbanismo y manufactura en Île-de-France.", type: "index" },
    { id: "hpc-capacity", title: "Capacidad de Supercomputación (HPC)", description: "Disponibilidad de horas de cálculo en superordenadores para investigación.", type: "capacity" },
    { id: "opensource-index", title: "Ecosistema Open Source", description: "Índice de contribución a proyectos de código abierto industrial.", type: "index" },
    { id: "ai-talent", title: "Talento en IA y Data Science", description: "Salarios y disponibilidad de doctores en IA en la región de París.", type: "benchmark" },
    { id: "fiber-5g-coverage", title: "Despliegue de Fibra Óptica y 5G", description: "Mapas de cobertura de alta velocidad para empresas.", type: "directory" },
    { id: "quantum-projects", title: "Proyectos de Computación Cuántica", description: "Estado del arte de startups cuánticas en el ecosistema.", type: "forecast" },
    { id: "secnumcloud", title: "Soberanía de Datos en la Nube", description: "Adopción de soluciones cloud con certificación SecNumCloud (ANSSI).", type: "index" },
    { id: "uam-drones", title: "Drones y Movilidad Aérea Urbana", description: "Datos de vuelos de prueba y regulación en la región parisina.", type: "forecast" },
    { id: "deeptech-vc", title: "Inversión VC en Deep Tech", description: "Flujo de capital riesgo hacia startups de tecnología profunda.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 5: SECTOR PRIMARIO E INFRAESTRUCTURAS
// ============================================

export const asaja: PremiumPartner = {
  id: "asaja",
  name: "ASAJA",
  fullName: "Asociación Agraria de Jóvenes Agricultores",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Agricultura y Ganadería",
  
  authorityContext: {
    narrative: "ASAJA es la mayor organización profesional agraria de España. Con una capilaridad única en el territorio, representan al 'campo real'. Su importancia estratégica en ProcureData radica en la digitalización del sector primario: son la puerta de entrada para datos sobre cultivos, ganadería y la implementación del Kit Digital en el entorno rural. Manejan la interlocución clave para la Política Agraria Común (PAC).",
    keyStats: [
      { value: "200K+", label: "Agricultores Representados" },
      { value: "#1", label: "Organización Agraria ES" },
      { value: "17", label: "CCAA con Presencia" }
    ],
    headquarters: "Madrid, España"
  },
  
  ecosystem: [
    { name: "Dcoop", description: "Mayor productor oleícola mundial" },
    { name: "Covap", description: "Cooperativa Ganadera del Valle de los Pedroches" },
    { name: "Anecoop", description: "Exportación de cítricos y hortalizas" },
    { name: "Central Lechera Asturiana", description: "Lácteos" },
    { name: "Borges", description: "Frutos secos" },
    { name: "Grupo AN", description: "Cereales y avicultura" },
    { name: "BonÀrea", description: "Agroalimentario" },
    { name: "Agroseguro", description: "Seguros agrarios - partner clave" }
  ],
  
  dataAnalysis: {
    summary: "Datos sobre superficie cultivable, previsiones de cosecha y costes de insumos agrarios (fertilizantes, piensos). Son datos críticos para predecir la inflación alimentaria.",
    capabilities: [
      "Previsión cosechas",
      "Costes de insumos",
      "Agua de riego",
      "PAC digital"
    ],
    uniqueValue: "La única fuente con datos reales del campo español: desde precios en origen hasta impacto climático en la producción."
  },
  
  useCases: [
    { id: "olive-harvest", title: "Previsión de Cosecha de Aceite de Oliva", description: "Estimaciones tempranas de producción basadas en floración y clima (afecta precio mundial).", type: "forecast" },
    { id: "fertilizer-costs", title: "Costes de Fertilizantes Nitrogenados", description: "Evolución del precio de insumos clave para el agricultor.", type: "cost" },
    { id: "irrigation-water", title: "Disponibilidad de Agua de Riego", description: "Datos de dotaciones hídricas por cuenca hidrográfica.", type: "capacity" },
    { id: "pig-census", title: "Censo Ganadero Porcino", description: "Cabezas de ganado disponibles para la industria cárnica.", type: "index" },
    { id: "drought-impact", title: "Impacto de la Sequía en Cereales", description: "% de pérdidas estimadas en trigo y cebada antes de la cosecha.", type: "risk" },
    { id: "origin-prices", title: "Precios en Origen (La Lonja)", description: "Cotizaciones semanales reales pagadas al agricultor (vs. precio supermercado).", type: "index" },
    { id: "digital-logbook", title: "Adopción de Cuaderno de Campo Digital", description: "% de explotaciones que digitalizan sus registros de tratamientos fitosanitarios.", type: "index" },
    { id: "seasonal-labor", title: "Mano de Obra en Campaña", description: "Disponibilidad de trabajadores temporeros para recolección de fruta.", type: "capacity" },
    { id: "rural-renewables", title: "Producción de Energías Renovables Rurales", description: "Datos de parques solares/biomasa en terrenos agrícolas.", type: "capacity" },
    { id: "animal-welfare", title: "Trazabilidad de Bienestar Animal", description: "Certificaciones de granjas que cumplen estándares superiores a la norma.", type: "directory" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const fnsea: PremiumPartner = {
  id: "fnsea",
  name: "FNSEA",
  fullName: "Fédération Nationale des Syndicats d'Exploitants Agricoles",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Agricultura y Soberanía Alimentaria",
  
  authorityContext: {
    narrative: "La FNSEA es el sindicato agrícola mayoritario en Francia, representando a más de 200.000 agricultores. Francia es la potencia agrícola de la UE, y la FNSEA es su voz. Su enfoque actual es la 'Tercera Revolución Agrícola': robótica, genética y datos. Son fundamentales para validar el cumplimiento de la Ley EGALIM (equilibrio de precios comerciales) y la trazabilidad de la cadena alimentaria.",
    keyStats: [
      { value: "200K+", label: "Agricultores Miembros" },
      { value: "#1", label: "Potencia Agrícola UE" },
      { value: "100+", label: "Años de Historia" }
    ],
    headquarters: "París, Île-de-France"
  },
  
  ecosystem: [
    { name: "Tereos", description: "Azúcar y almidón" },
    { name: "Sodaal", description: "Lácteos - Entremont/Candia" },
    { name: "Agrial", description: "Cooperativa multirubro" },
    { name: "InVivo", description: "Agricultura y jardinería" },
    { name: "Vivescia", description: "Cereales y panadería" },
    { name: "Lactalis", description: "Líder mundial lácteo - relación proveedor" },
    { name: "Axereal", description: "Grano y malta" },
    { name: "Eureden", description: "Agroalimentario bretón" }
  ],
  
  dataAnalysis: {
    summary: "Poseen datos profundos sobre soberanía alimentaria, agricultura de carbono (créditos de carbono agrícolas) y normativas sanitarias.",
    capabilities: [
      "Ley Egalim - precios",
      "Créditos carbono agrícolas",
      "Fitosanitarios y bio",
      "Robótica agrícola"
    ],
    uniqueValue: "El único nodo que puede certificar datos de soberanía alimentaria francesa y validar créditos de carbono agrícolas."
  },
  
  useCases: [
    { id: "milk-costs", title: "Costes de Producción de Leche", description: "Benchmark oficial para negociaciones de precios con la gran distribución (Ley Egalim).", type: "benchmark" },
    { id: "carbon-credits-agri", title: "Créditos de Carbono Agrícolas", description: "Volumen de CO2 secuestrado en suelos agrícolas franceses disponible para compensación.", type: "index" },
    { id: "pesticide-use", title: "Uso de Productos Fitosanitarios", description: "Datos de reducción de pesticidas y transición a bio-control.", type: "index" },
    { id: "wheat-yield", title: "Rendimiento de Trigo Blando", description: "Datos de calidad (proteína) y volumen para exportación.", type: "index" },
    { id: "cattle-health", title: "Salud de la Cabaña Bovina", description: "Estadísticas epidemiológicas y de vacunación.", type: "risk" },
    { id: "organic-transition", title: "Transición a Agricultura Ecológica", description: "Tasa de conversión de hectáreas a Bio.", type: "index" },
    { id: "frost-damage", title: "Impacto de Heladas en Viñedos", description: "Datos de daños en tiempo real para la industria del vino.", type: "risk" },
    { id: "agri-diesel", title: "Consumo de Diésel Agrícola (GNR)", description: "Datos de demanda energética del sector primario.", type: "index" },
    { id: "land-prices", title: "Precios de Tierras Agrícolas", description: "Evolución del coste por hectárea en diferentes regiones francesas.", type: "index" },
    { id: "milking-robots", title: "Adopción de Robótica de Ordeño", description: "Nivel de automatización en granjas lecheras.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const ance: PremiumPartner = {
  id: "ance",
  name: "ANCE",
  fullName: "Associazione Nazionale Costruttori Edili",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Construcción e Infraestructuras",
  
  authorityContext: {
    narrative: "ANCE representa a la industria italiana de la construcción, con cerca de 20.000 empresas privadas. Son el motor detrás de la ejecución del PNRR (Plan Nacional de Recuperación). Su foco estratégico es la regeneración urbana y la sostenibilidad edilicia. Para ProcureData, son la fuente de la verdad sobre costes de obra, licitaciones públicas y el famoso 'Superbonus' de eficiencia energética.",
    keyStats: [
      { value: "20K", label: "Empresas Miembro" },
      { value: "€200B", label: "PNRR Construcción" },
      { value: "#2", label: "Sector Construcción EU" }
    ],
    headquarters: "Roma, Lacio"
  },
  
  ecosystem: [
    { name: "Webuild", description: "Grandes infraestructuras (antes Salini Impregilo)" },
    { name: "Pizzarotti", description: "Construcción e ingeniería" },
    { name: "Ghella", description: "Túneles y obras subterráneas" },
    { name: "Rizzani de Eccher", description: "Construcción general" },
    { name: "Itinera (Grupo Gavio)", description: "Infraestructuras viarias" },
    { name: "CMB", description: "Cooperativa constructora" },
    { name: "Vianini Lavori", description: "Obras civiles" },
    { name: "Mapei", description: "Materiales - partner asociado" }
  ],
  
  dataAnalysis: {
    summary: "Datos de 'economía real': costes de materiales, licitaciones públicas y rehabilitación energética. Esenciales para bancos e inversores inmobiliarios.",
    capabilities: [
      "Precios materiales obra",
      "Ejecución PNRR",
      "Superbonus 110%",
      "Licitaciones públicas"
    ],
    uniqueValue: "El único nodo con datos reales de ejecución del mayor plan de inversión pública de Italia en décadas."
  },
  
  useCases: [
    { id: "construction-materials", title: "Precios de Materiales de Construcción", description: "Índice mensual de fluctuación de acero corrugado, cemento y betún.", type: "index" },
    { id: "pnrr-execution", title: "Ejecución de Fondos PNRR", description: "% de obras públicas adjudicadas e iniciadas financiadas por la UE.", type: "index" },
    { id: "energy-retrofit", title: "Tasa de Rehabilitación Energética", description: "Metros cuadrados renovados bajo incentivos fiscales (Superbonus 110%).", type: "index" },
    { id: "labor-costs-construction", title: "Costes Laborales en Obra", description: "Tablas salariales provinciales para oficiales y peones.", type: "benchmark" },
    { id: "failed-tenders", title: "Licitaciones Desiertas", description: "Estadísticas de obras públicas sin ofertas (indicador de precios base irreales).", type: "risk" },
    { id: "cement-consumption", title: "Consumo de Cemento", description: "Dato adelantado de actividad económica regional.", type: "index" },
    { id: "construction-safety", title: "Seguridad en Obras", description: "Datos de siniestralidad laboral y cumplimiento normativo.", type: "risk" },
    { id: "new-housing-sales", title: "Venta de Vivienda Nueva", description: "Transacciones de inmuebles residenciales de nueva planta.", type: "index" },
    { id: "demolition-waste", title: "Gestión de Residuos de Demolición", description: "Volúmenes de escombros procesados para reciclaje (economía circular).", type: "capacity" },
    { id: "builder-credit", title: "Crédito al Constructor", description: "Condiciones de acceso a financiación bancaria para promotores.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const zdb: PremiumPartner = {
  id: "zdb",
  name: "ZDB",
  fullName: "Zentralverband Deutsches Baugewerbe",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Construcción y Artesanía Industrial",
  
  authorityContext: {
    narrative: "La ZDB es la federación líder de la construcción alemana, representando a 35.000 empresas, en su mayoría PYMEs familiares (Mittelstand). A diferencia de las grandes corporaciones, la ZDB representa el tejido que construye las casas, carreteras y puentes de Alemania. Lideran la adopción de BIM (Building Information Modeling) y la construcción sostenible en madera y materiales eficientes.",
    keyStats: [
      { value: "35K", label: "Empresas Miembro" },
      { value: "€150B", label: "Sector Construcción DE" },
      { value: "Mittelstand", label: "PYMEs Familiares" }
    ],
    headquarters: "Berlín, Alemania"
  },
  
  ecosystem: [
    { name: "Goldbeck", description: "Construcción industrial y escolar" },
    { name: "Max Bögl", description: "Construcción modular y eólica" },
    { name: "Leonhard Weiss", description: "Ingeniería civil y vías" },
    { name: "Wolff & Müller", description: "Construcción sostenible" },
    { name: "Köster", description: "Edificación" },
    { name: "Bauer AG", description: "Ingeniería de cimentación" },
    { name: "Züblin (Strabag)", description: "Ingeniería estructural" },
    { name: "Heidelberg Materials", description: "Proveedor clave asociado" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de la eficiencia constructiva. Datos sobre construcción modular, prefabricación y estándares de eficiencia energética (KfW).",
    capabilities: [
      "BIM en PYMEs",
      "Construcción modular",
      "Estándar KfW",
      "Escasez artesanos"
    ],
    uniqueValue: "El único ecosistema que mide la salud del Mittelstand constructor alemán: desde permisos hasta insolvencias."
  },
  
  useCases: [
    { id: "building-permits", title: "Índice de Permisos de Construcción", description: "Nuevas licencias concedidas para vivienda residencial (indicador económico clave).", type: "index" },
    { id: "bim-adoption-sme", title: "Adopción de BIM en PYMEs", description: "% de empresas medianas que utilizan modelado digital 3D.", type: "index" },
    { id: "housing-costs-de", title: "Costes de Construcción de Vivienda", description: "Precio por m² de construcción residencial (Baupreisindex).", type: "benchmark" },
    { id: "skilled-trades-shortage", title: "Escasez de Artesanos Calificados", description: "Vacantes abiertas para albañiles, carpinteros y electricistas.", type: "capacity" },
    { id: "timber-construction", title: "Uso de Madera en Construcción", description: "Tendencia de cuota de mercado de edificios con estructura de madera.", type: "index" },
    { id: "project-completion-times", title: "Tiempos de Finalización de Obras", description: "Duración media de proyectos desde inicio hasta entrega.", type: "benchmark" },
    { id: "municipal-infrastructure", title: "Inversión en Infraestructura Municipal", description: "Gasto de ayuntamientos en mantenimiento de carreteras y escuelas.", type: "index" },
    { id: "kfw-efficiency", title: "Eficiencia Energética (Estándar KfW)", description: "% de nuevos edificios que cumplen los estándares de consumo casi nulo.", type: "index" },
    { id: "aggregates-supply", title: "Disponibilidad de Arena y Grava", description: "Datos de suministro local de áridos (recurso crítico).", type: "capacity" },
    { id: "construction-insolvencies", title: "Índice de Insolvencias en Construcción", description: "Salud financiera del sector constructor alemán.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const foodI: PremiumPartner = {
  id: "food-i",
  name: "Food+i",
  fullName: "Clúster Alimentario del Valle del Ebro",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Industria Alimentaria y Tecnología (FoodTech)",
  
  authorityContext: {
    narrative: "El Clúster Alimentario del Valle del Ebro (Food+i) agrupa a empresas de La Rioja, Navarra, Aragón y País Vasco, una de las huertas más ricas de Europa. Su enfoque no es el campo, sino la transformación industrial: conserveras, congelados, platos preparados y tecnología de los alimentos. Es un partner clave para datos de seguridad alimentaria, packaging y FoodTech.",
    keyStats: [
      { value: "150+", label: "Empresas Miembro" },
      { value: "€10B+", label: "Facturación Agregada" },
      { value: "4", label: "CCAA del Ebro" }
    ],
    headquarters: "Logroño, La Rioja"
  },
  
  ecosystem: [
    { name: "Grupo Palacios", description: "Alimentación/Embutidos/Pizzas" },
    { name: "Ebro Foods", description: "Arroz y Pasta" },
    { name: "Grupo Riberebro", description: "Conservas vegetales/Champiñón" },
    { name: "Florette", description: "Ensaladas IV Gama" },
    { name: "Congelados de Navarra", description: "Verduras congeladas" },
    { name: "General Mills", description: "Planta de San Adrián" },
    { name: "Viscofan", description: "Envolturas cárnicas - líder mundial" },
    { name: "CNTA", description: "Centro Nacional de Tecnología y Seguridad Alimentaria" }
  ],
  
  dataAnalysis: {
    summary: "Datos de procesamiento industrial. Aportan valor sobre trazabilidad industrial (del campo a la lata), consumo de agua en fábrica y tendencias de nuevos productos (proteína alternativa).",
    capabilities: [
      "Seguridad alimentaria",
      "Eficiencia hídrica",
      "Clean label",
      "Proteína vegetal"
    ],
    uniqueValue: "El único hub donde puedes medir la transformación del alimento español: desde la huerta hasta la lata de conserva."
  },
  
  useCases: [
    { id: "veggie-processing", title: "Capacidad de Procesamiento de Vegetales", description: "Toneladas/hora disponibles en plantas de congelado durante campaña.", type: "capacity" },
    { id: "food-safety-incidents", title: "Incidencias de Seguridad Alimentaria", description: "Datos anonimizados de alertas de calidad en fábrica (listeria/salmonela).", type: "risk" },
    { id: "water-per-kg", title: "Consumo de Agua por Kg de Producto", description: "Benchmarks de eficiencia hídrica en conserveras.", type: "benchmark" },
    { id: "clean-label-trends", title: "Tendencias en 'Clean Label'", description: "% de nuevos productos lanzados sin aditivos artificiales.", type: "forecast" },
    { id: "shelf-life", title: "Vida Útil (Shelf Life) de Productos", description: "Datos técnicos sobre caducidades medias por categoría y envase.", type: "benchmark" },
    { id: "packaging-costs", title: "Precios de Hojalata y Vidrio para Envases", description: "Impacto del coste del packaging en el producto final.", type: "cost" },
    { id: "byproduct-valorization", title: "Valorización de Subproductos", description: "Oferta de destrío vegetal para alimentación animal o biogás.", type: "capacity" },
    { id: "plant-protein-innovation", title: "Innovación en Proteína Vegetal", description: "Desarrollo de análogos cárnicos en el Valle del Ebro.", type: "forecast" },
    { id: "canned-exports", title: "Exportación de Conservas", description: "Volúmenes de venta a mercados internacionales (Francia/UK).", type: "index" },
    { id: "eol-automation", title: "Automatización de Final de Línea", description: "Nivel de robotización en empaquetado y paletizado.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

// Colección de todos los Premium Partners
export const premiumPartnersData: PremiumPartner[] = [
  // Paquete 14: Nodos Fundadores
  bmeGermany,
  aerospaceValley,
  foodValley,
  motorValley,
  barcelona22,
  // Paquete 1: Prioridad Inmediata
  siliconSaxony,
  itsOwl,
  adaci,
  cdaf,
  minalogic,
  // Paquete 2: Eje Benelux
  nevi,
  brainportEindhoven,
  portRotterdam,
  agoria,
  antwerpChemical,
  // Paquete 3: Potencias Industriales
  vda,
  vci,
  medicalValley,
  aerce,
  gaiaCluster,
  // Paquete 4: Automoción Latina y Deep Tech
  anfia,
  pfa,
  federchimica,
  packagingValley,
  systematicParis,
  // Paquete 5: Sector Primario e Infraestructuras
  asaja,
  fnsea,
  ance,
  zdb,
  foodI
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
