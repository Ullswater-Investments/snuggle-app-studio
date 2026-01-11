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
  antwerpChemical
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
