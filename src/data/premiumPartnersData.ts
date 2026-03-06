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

// ============================================
// PAQUETE 6: CIELOS, SALUD Y ENERGÍA LIMPIA
// ============================================

export const hamburgAviation: PremiumPartner = {
  id: "hamburg-aviation",
  name: "Hamburg Aviation",
  fullName: "Luftfahrtcluster Metropolregion Hamburg",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Aviación Civil e Interiores de Cabina",
  
  authorityContext: {
    narrative: "Hamburg Aviation es uno de los clústeres aeronáuticos más grandes del mundo. Es la ciudad de Airbus (donde se ensamblan los A320 y se pintan los fuselajes) y la sede mundial de Lufthansa Technik (Mantenimiento, Reparación y Operaciones - MRO). Este nodo es la autoridad global en interiores de aviones (Cabin Interiors): desde los asientos hasta la iluminación y el entretenimiento a bordo. Si vuelas en un avión comercial, es muy probable que el interior se haya definido aquí.",
    keyStats: [
      { value: "40.000+", label: "Empleados Directos" },
      { value: "#1", label: "Hub MRO de Europa" },
      { value: "A320/A350", label: "Línea de Ensamblaje" }
    ],
    headquarters: "Hamburgo, Alemania"
  },
  
  ecosystem: [
    { name: "Airbus Operations", description: "Ensamblaje final de aeronaves" },
    { name: "Lufthansa Technik", description: "Líder mundial en mantenimiento MRO" },
    { name: "Diehl Aviation", description: "Sistemas de cabina y aviónica" },
    { name: "Safran Cabin", description: "Interiores de aeronaves" },
    { name: "Hamburg Airport", description: "Operaciones aeroportuarias" },
    { name: "ZAL", description: "Centro de Investigación Aeronáutica Aplicada" },
    { name: "Recaro Aircraft Seating", description: "Asientos de avión" },
    { name: "Aerodata", description: "Sistemas de vigilancia aérea" }
  ],
  
  dataAnalysis: {
    summary: "El 'oro' de este nodo son los datos de MRO (Mantenimiento), la vida útil de las aeronaves y la experiencia del pasajero. También lideran datos sobre el uso de hidrógeno en aviación (proyecto 'Green Aviation').",
    capabilities: [
      "Benchmarks de costes MRO",
      "Datos de materiales de cabina",
      "Logística de repuestos AOG",
      "Tendencias en aviación verde"
    ],
    uniqueValue: "Acceso a datos de toda la cadena de valor aeronáutica civil, desde ensamblaje hasta mantenimiento y reciclaje de aeronaves."
  },
  
  useCases: [
    { id: "mro-costs", title: "Costes de Mantenimiento por Hora de Vuelo", description: "Benchmarks reales de MRO para flotas de A320/A350.", type: "benchmark" },
    { id: "cabin-materials", title: "Innovación en Materiales de Cabina", description: "Datos sobre inflamabilidad y peso de nuevos polímeros para interiores.", type: "index" },
    { id: "paint-slots", title: "Disponibilidad de Slots de Pintura", description: "Capacidad en hangares para repintado de fuselajes.", type: "capacity" },
    { id: "hydrogen-ground", title: "Consumo de Hidrógeno en Tierra", description: "Datos piloto de vehículos de servicio aeroportuario propulsados por H2.", type: "index" },
    { id: "cabin-acoustics", title: "Acústica de Cabina", description: "Mapas de ruido interior en diferentes configuraciones de aeronave.", type: "benchmark" },
    { id: "aircraft-recycling", title: "Reciclaje de Aviones (End-of-Life)", description: "Recuperación de materiales valiosos al desguazar aeronaves.", type: "index" },
    { id: "ife-trends", title: "Sistemas de Entretenimiento (IFE)", description: "Tendencias de conectividad y consumo de datos en vuelo.", type: "index" },
    { id: "p2f-conversion", title: "Conversión de Pasajero a Carguero (P2F)", description: "Demanda y capacidad de ingeniería para transformar aviones antiguos.", type: "capacity" },
    { id: "aog-logistics", title: "Logística de Repuestos Aeronáuticos", description: "Tiempos de entrega de componentes críticos (AOG - Aircraft on Ground).", type: "cost" },
    { id: "3d-cabin-parts", title: "Impresión 3D de Piezas de Cabina", description: "Catálogo de piezas de recambio no estructurales certificadas.", type: "directory" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const aeropolis: PremiumPartner = {
  id: "aeropolis",
  name: "Aerópolis",
  fullName: "Parque Tecnológico Aeroespacial de Andalucía",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Aeroespacial y Defensa",
  
  authorityContext: {
    narrative: "Situado en Sevilla (junto a la línea de ensamblaje final del A400M de Airbus), Aerópolis es el único parque científico y tecnológico de Europa dedicado exclusivamente a la industria aeroespacial. Representa el polo sur de la aviación europea. Su especialidad es la aeronáutica militar de transporte, los drones (UAVs) y las aeroestructuras de fibra de carbono. Es un ecosistema cerrado y altamente seguro.",
    keyStats: [
      { value: "A400M", label: "Línea de Ensamblaje Final" },
      { value: "#1", label: "Hub Composites de España" },
      { value: "100+", label: "Empresas Aeroespaciales" }
    ],
    headquarters: "Sevilla, España"
  },
  
  ecosystem: [
    { name: "Airbus Defence and Space", description: "Aviones militares de transporte" },
    { name: "Alestis Aerospace", description: "Tier-1 Aeroestructuras" },
    { name: "Aernnova", description: "Tier-1 Aeroestructuras" },
    { name: "Aciturri", description: "Aeroestructuras y motor" },
    { name: "CATEC", description: "Centro Avanzado de Tecnologías Aeroespaciales" },
    { name: "Sofitec", description: "Composites avanzados" },
    { name: "Indra", description: "Sistemas de defensa" },
    { name: "Alter Technology", description: "Certificación de componentes espaciales" }
  ],
  
  dataAnalysis: {
    summary: "Datos únicos sobre materiales compuestos (composites), procesos de curado en autoclave y ensayos de drones. Al ser un hub militar, manejan estándares de seguridad de datos muy altos.",
    capabilities: [
      "Certificación de composites",
      "Telemetría de UAVs",
      "Fabricación aditiva certificada",
      "Datos de cadena A400M"
    ],
    uniqueValue: "Único ecosistema europeo 100% aeroespacial con capacidades de defensa, drones y manufactura avanzada de composites."
  },
  
  useCases: [
    { id: "autoclave-capacity", title: "Capacidad de Autoclaves", description: "Disponibilidad de horas en hornos industriales para curado de fibra de carbono.", type: "capacity" },
    { id: "uav-testing", title: "Ensayos de Vuelo de UAVs", description: "Datos de telemetría y zonas de prueba para drones civiles y militares.", type: "index" },
    { id: "composite-certification", title: "Certificación de Materiales Compuestos", description: "Base de datos de propiedades mecánicas de nuevas resinas aeronáuticas.", type: "directory" },
    { id: "a400m-supply", title: "Cadena de Suministro del A400M", description: "Riesgo y capacidad de proveedores del avión de transporte militar.", type: "risk" },
    { id: "metal-am", title: "Fabricación Aditiva en Metal", description: "Datos de certificación de piezas impresas en 3D para vuelo (CATEC es líder).", type: "directory" },
    { id: "military-mro", title: "Mantenimiento de Aeronaves Militares", description: "Ciclos de revisión de flotas de transporte táctico.", type: "benchmark" },
    { id: "composite-carbon", title: "Consumo Energético en Fabricación de Composites", description: "Huella de carbono de la producción de piezas ligeras.", type: "index" },
    { id: "space-components", title: "Espacio y Satélites", description: "Datos de pruebas de componentes electrónicos para uso espacial.", type: "directory" },
    { id: "aero-talent", title: "Talento en Montaje Aeronáutico", description: "Disponibilidad de operarios cualificados en ensamblaje estructural.", type: "capacity" },
    { id: "large-logistics", title: "Logística de Grandes Componentes", description: "Rutas y costes para transporte de secciones de fuselaje (Beluga).", type: "cost" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const biowin: PremiumPartner = {
  id: "biowin",
  name: "BioWin",
  fullName: "Pôle de Compétitivité Santé de Wallonie",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Biofarmacia y Vacunas",
  
  authorityContext: {
    narrative: "Valonia (sur de Bélgica) es conocida como el 'valle de la biotecnología'. BioWin es el clúster que orquesta este ecosistema de clase mundial. Aquí se producen una gran parte de las vacunas del mundo. Es un nodo crítico para la soberanía sanitaria europea. Agrupan a big pharma, centros de investigación de radioisótopos (medicina nuclear) y terapias celulares avanzadas.",
    keyStats: [
      { value: "30%", label: "Vacunas Mundiales Producidas" },
      { value: "150+", label: "Empresas Biotecnológicas" },
      { value: "#1", label: "Hub de Radioisótopos" }
    ],
    headquarters: "Charleroi, Bélgica"
  },
  
  ecosystem: [
    { name: "GSK", description: "Centro mundial de vacunas" },
    { name: "UCB", description: "Biofarmacia y neurología" },
    { name: "IBA", description: "Líder mundial en protonterapia contra el cáncer" },
    { name: "Kaneka Eurogentec", description: "Biomanufactura" },
    { name: "Univercells", description: "Tecnología de bioprocesos" },
    { name: "Takeda", description: "Producción de derivados del plasma" },
    { name: "Catalent", description: "Terapia celular y génica" },
    { name: "IRE", description: "Institut National des Radioéléments" }
  ],
  
  dataAnalysis: {
    summary: "Poseen datos estratégicos sobre capacidad de bioproducción, cadena de frío farmacéutica y medicina nuclear.",
    capabilities: [
      "Capacidad de fermentación",
      "Logística de cadena de frío",
      "Suministro de radioisótopos",
      "Ensayos clínicos fase temprana"
    ],
    uniqueValue: "Centro neurálgico de la producción de vacunas y radioisótopos médicos para toda Europa."
  },
  
  useCases: [
    { id: "fermentation-capacity", title: "Capacidad de Fermentación", description: "Litros disponibles en biorreactores para producción de proteínas recombinantes.", type: "capacity" },
    { id: "cold-chain", title: "Logística de Vacunas (Cold Chain)", description: "Datos de fiabilidad y capacidad de transporte a -80°C en el hub de Lieja.", type: "capacity" },
    { id: "radioisotopes", title: "Suministro de Radioisótopos", description: "Disponibilidad de Molibdeno-99 para diagnóstico de cáncer (crítico mundial).", type: "capacity" },
    { id: "early-trials", title: "Ensayos Clínicos de Fase Temprana", description: "Mapa de hospitales belgas listos para pruebas Fase 1.", type: "directory" },
    { id: "cell-therapy-cost", title: "Coste de Producción de Terapias Celulares", description: "Modelos de costes para tratamientos CAR-T autólogos.", type: "cost" },
    { id: "bioprocess-talent", title: "Talento en Bioprocesos", description: "Escasez de operarios de sala blanca cualificados.", type: "capacity" },
    { id: "pharma-exports", title: "Exportación Biofarmacéutica", description: "Flujos de exportación de vacunas desde Bélgica al resto del mundo.", type: "index" },
    { id: "medtech-startups", title: "Startups de MedTech", description: "Radar de innovación en dispositivos médicos implantables.", type: "directory" },
    { id: "pharma-water", title: "Calidad del Agua Farmacéutica", description: "Estándares y monitoreo de agua purificada (WFI) en parques industriales.", type: "benchmark" },
    { id: "biotech-vc", title: "Inversión en Biotech", description: "Flujo de capital riesgo hacia ciencias de la vida en Valonia.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const healthClusterPortugal: PremiumPartner = {
  id: "health-cluster-portugal",
  name: "Health Cluster Portugal",
  fullName: "Pólo de Competitividade da Saúde",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Salud, Farmacia y Turismo Médico",
  
  authorityContext: {
    narrative: "Health Cluster Portugal posiciona al país como un hub emergente de innovación en salud y manufactura farmacéutica competitiva. Portugal se ha convertido en un destino clave para la CDMO (fabricación por contrato de fármacos) y el desarrollo de software médico, aprovechando su talento ingenieril de alta calidad y costes competitivos. También lideran la estrategia de turismo de salud y bienestar.",
    keyStats: [
      { value: "€4B+", label: "Exportaciones Farmacéuticas" },
      { value: "#1", label: "CDMO Emergente en Europa" },
      { value: "Rápido", label: "Reclutamiento Ensayos Clínicos" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "Bial", description: "Mayor farmacéutica portuguesa, innovadora en neurología" },
    { name: "Hovione", description: "Líder mundial en CDMO y tecnología de inhaladores" },
    { name: "Grupo Luz Saúde", description: "Red hospitalaria privada" },
    { name: "CUF", description: "Grupo hospitalario" },
    { name: "Bluepharma", description: "Genéricos y producción" },
    { name: "Medtronic Portugal", description: "Dispositivos médicos" },
    { name: "Siemens Healthineers Portugal", description: "Tecnología médica" },
    { name: "Atral", description: "Antibióticos y fármacos" }
  ],
  
  dataAnalysis: {
    summary: "Datos valiosos sobre capacidad de síntesis química, ensayos clínicos (Portugal es rápido reclutando pacientes) y datos hospitalarios del sector privado.",
    capabilities: [
      "Capacidad de atomización (spray drying)",
      "Velocidad de reclutamiento clínico",
      "Costes de desarrollo HealthTech",
      "Datos de turismo médico"
    ],
    uniqueValue: "Hub emergente con costes competitivos, talento cualificado y rapidez en ensayos clínicos, puerta de entrada al mercado lusófono."
  },
  
  useCases: [
    { id: "spray-drying", title: "Capacidad de Atomización (Spray Drying)", description: "Disponibilidad de tecnología para mejorar la solubilidad de fármacos (especialidad de Hovione).", type: "capacity" },
    { id: "patient-recruitment", title: "Reclutamiento de Pacientes", description: "Velocidad media para completar cohortes en ensayos clínicos en Portugal.", type: "benchmark" },
    { id: "generics-export", title: "Exportación de Genéricos", description: "Volúmenes de producción de medicamentos fuera de patente.", type: "index" },
    { id: "medical-tourism", title: "Turismo Médico y de Rehabilitación", description: "Flujos de pacientes extranjeros buscando tratamientos en Portugal.", type: "index" },
    { id: "e-prescription", title: "Adopción de Receta Electrónica", description: "Estadísticas de uso de PEM (Prescrição Eletrónica Médica).", type: "index" },
    { id: "healthtech-costs", title: "Costes de Desarrollo de Software Médico", description: "Tarifas competitivas de ingeniería para HealthTech en Lisboa/Oporto.", type: "cost" },
    { id: "silver-economy", title: "Envejecimiento Activo", description: "Datos demográficos y soluciones de 'Silver Economy'.", type: "strategy" },
    { id: "medical-cannabis", title: "Producción de Cannabis Medicinal", description: "Datos del creciente sector de cultivo autorizado en Portugal.", type: "capacity" },
    { id: "health-interop", title: "Interoperabilidad de Datos de Salud", description: "Integración entre sistema público (SNS) y privado.", type: "index" },
    { id: "antibiotic-patterns", title: "Consumo de Antibióticos", description: "Patrones de prescripción y resistencia antimicrobiana.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const capenergies: PremiumPartner = {
  id: "capenergies",
  name: "Capenergies",
  fullName: "Pôle de Compétitivité Énergies Non Génératrices de Gaz à Effet de Serre",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Transición Energética y Nuclear",
  
  authorityContext: {
    narrative: "Ubicado en la región Provenza-Alpes-Costa Azul (PACA), Córcega y Mónaco, Capenergies es el clúster de la energía descarbonizada. Esta región es única porque combina sol (fotovoltaica), viento (eólica flotante) y el proyecto científico más grande del mundo: ITER (fusión nuclear). Agrupan a toda la cadena de valor de la energía libre de CO2, con un fuerte enfoque en hidrógeno y Smart Grids.",
    keyStats: [
      { value: "ITER", label: "Proyecto de Fusión Nuclear" },
      { value: "300+", label: "Días de Sol al Año" },
      { value: "€50B+", label: "Inversión en Energía Limpia" }
    ],
    headquarters: "Marsella, Francia"
  },
  
  ecosystem: [
    { name: "EDF", description: "Gigante eléctrico y nuclear" },
    { name: "CEA", description: "Comisión de Energía Atómica y Energías Alternativas" },
    { name: "Engie", description: "Servicios energéticos y gas" },
    { name: "CMA CGM", description: "Logística y descarbonización marítima" },
    { name: "Schneider Electric", description: "Gestión de energía" },
    { name: "TotalEnergies", description: "Transición a renovables" },
    { name: "Enedis", description: "Distribución eléctrica" },
    { name: "ITER Organization", description: "Reactor experimental de fusión" }
  ],
  
  dataAnalysis: {
    summary: "Datos de vanguardia sobre sistemas energéticos insulares (Córcega), cadena de suministro nuclear y eficiencia energética en clima mediterráneo.",
    capabilities: [
      "Rendimiento solar en clima cálido",
      "Gestión de smart grids",
      "Cadena de suministro ITER",
      "Hidrógeno marítimo"
    ],
    uniqueValue: "Único clúster que combina todas las tecnologías de descarbonización: solar, eólica, nuclear (fisión y fusión) e hidrógeno."
  },
  
  useCases: [
    { id: "solar-hot-climate", title: "Eficiencia de Paneles Solares en Clima Cálido", description: "Datos de rendimiento real de PV con altas temperaturas (degradación térmica).", type: "benchmark" },
    { id: "smart-grid", title: "Integración de Renovables en Red (Smart Grid)", description: "Datos de gestión de picos de demanda en redes inteligentes (proyecto FlexGrid).", type: "index" },
    { id: "iter-supply", title: "Cadena de Suministro ITER", description: "Necesidades de materiales y componentes de ultra-alta tecnología para fusión nuclear.", type: "capacity" },
    { id: "maritime-hydrogen", title: "Hidrógeno para Transporte Marítimo", description: "Proyectos de descarbonización del puerto de Marsella-Fos.", type: "strategy" },
    { id: "tourism-energy", title: "Consumo Energético en Zonas Turísticas", description: "Patrones de estacionalidad extrema en la Costa Azul.", type: "index" },
    { id: "floating-wind", title: "Eólica Marina Flotante", description: "Datos de pruebas piloto en el Mediterráneo.", type: "index" },
    { id: "island-microgrids", title: "Micro-Redes en Islas", description: "Datos de autonomía energética en Córcega.", type: "benchmark" },
    { id: "ev-charging-riviera", title: "Recarga de Vehículos Eléctricos", description: "Infraestructura en Mónaco y Niza (alta densidad de EVs).", type: "capacity" },
    { id: "geothermal", title: "Geotermia", description: "Potencial y explotación de calor del subsuelo.", type: "capacity" },
    { id: "industrial-decarb", title: "Descarbonización Industrial", description: "Datos de reducción de emisiones en la zona industrial de Fos-sur-Mer.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 7: ENERGÍA, SEGURIDAD Y MATERIALES
// ============================================

export const bdew: PremiumPartner = {
  id: "bdew",
  name: "BDEW",
  fullName: "Bundesverband der Energie- und Wasserwirtschaft",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Energía y Gestión del Agua",
  
  authorityContext: {
    narrative: "La Bundesverband der Energie- und Wasserwirtschaft (BDEW) es la asociación federal que gestiona las arterias de Alemania: electricidad, gas, calefacción urbana y agua. Representa a más de 1.900 empresas, desde los grandes grupos energéticos hasta las 'Stadtwerke' (empresas municipales) locales. Son los arquitectos de la Energiewende (transición energética). Para ProcureData, son la fuente definitiva de datos sobre infraestructura de carga, redes inteligentes y seguridad de suministro hídrico.",
    keyStats: [
      { value: "1.900+", label: "Empresas Miembros" },
      { value: "90%", label: "Suministro Energético Alemán" },
      { value: "#1", label: "Arquitecto de Energiewende" }
    ],
    headquarters: "Berlín, Alemania"
  },
  
  ecosystem: [
    { name: "E.ON", description: "Redes y soluciones energéticas" },
    { name: "RWE", description: "Generación, renovables y convencional" },
    { name: "EnBW", description: "Energía integrada" },
    { name: "Vattenfall Wärme Berlin", description: "Calefacción urbana" },
    { name: "MVV Energie", description: "Energía municipal" },
    { name: "Thyssengas", description: "Transporte de gas" },
    { name: "Berliner Wasserbetriebe", description: "Gestión de agua en Berlín" },
    { name: "Mainova", description: "Multi-utility de Frankfurt" }
  ],
  
  dataAnalysis: {
    summary: "Poseen datos granulares sobre infraestructura de carga pública para EVs, calidad del agua potable y la transición del gas natural al hidrógeno verde.",
    capabilities: [
      "Mapas de puntos de carga EV",
      "Calidad del agua por región",
      "Mix energético en tiempo real",
      "Proyectos de hidrógeno verde"
    ],
    uniqueValue: "Acceso directo a datos de toda la infraestructura energética e hídrica alemana, el sistema más complejo de Europa."
  },
  
  useCases: [
    { id: "charging-map", title: "Mapa de Puntos de Carga Pública", description: "Disponibilidad y potencia de cargadores en ciudades alemanas (Ladesäulenregister).", type: "directory" },
    { id: "grid-fees", title: "Tarifas de Acceso a Red (Grid Fees)", description: "Evolución de los costes regulados de distribución eléctrica.", type: "cost" },
    { id: "water-quality", title: "Calidad del Agua por Región", description: "Datos de dureza y composición mineral del agua potable (crítico para industria alimentaria).", type: "index" },
    { id: "district-heating", title: "Inversión en Redes de Calor", description: "Expansión de kilómetros de tubería para calefacción urbana.", type: "capacity" },
    { id: "energy-mix", title: "Mix Energético en Tiempo Real", description: "Porcentaje de eólica/solar vs carbón/gas en la red alemana.", type: "index" },
    { id: "water-losses", title: "Pérdidas en Redes de Agua", description: "Estadísticas de eficiencia y fugas en la distribución hídrica.", type: "benchmark" },
    { id: "smart-meters", title: "Despliegue de Smart Meters", description: "Tasa de instalación de contadores inteligentes en hogares y PYMEs.", type: "index" },
    { id: "gas-storage", title: "Capacidad de Almacenamiento de Gas", description: "Niveles de llenado de los depósitos subterráneos alemanes.", type: "capacity" },
    { id: "h2-projects", title: "Proyectos de Hidrógeno (H2)", description: "Base de datos de proyectos piloto de inyección de H2 en redes de gas.", type: "directory" },
    { id: "utility-cyber", title: "Digitalización de Utilities", description: "Inversión del sector en ciberseguridad para infraestructuras críticas.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const federmeccanica: PremiumPartner = {
  id: "federmeccanica",
  name: "Federmeccanica",
  fullName: "Federazione Sindacale dell'Industria Metalmeccanica Italiana",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Industria Metalmecánica y Manufactura",
  
  authorityContext: {
    narrative: "Federmeccanica es la federación sindical de la industria metalmecánica italiana. Representa el sector manufacturero más grande de Italia (1,6 millones de empleados): desde la maquinaria de precisión hasta la siderurgia y la mecatrónica. Es el interlocutor que negocia el convenio colectivo nacional. Su valor radica en los datos sobre costes laborales industriales, productividad y la adopción real de tecnologías de fábrica.",
    keyStats: [
      { value: "1,6M", label: "Empleados en el Sector" },
      { value: "#1", label: "Sector Manufacturero de Italia" },
      { value: "€200B+", label: "Facturación Anual" }
    ],
    headquarters: "Roma, Italia"
  },
  
  ecosystem: [
    { name: "Leonardo", description: "Defensa y Aeroespacial" },
    { name: "Fincantieri", description: "Construcción naval - cruceros y militar" },
    { name: "Prysmian", description: "Cables de energía y telecomunicaciones" },
    { name: "Danieli", description: "Plantas siderúrgicas" },
    { name: "Brembo", description: "Sistemas de freno" },
    { name: "Hitachi Rail Italia", description: "Transporte ferroviario" },
    { name: "Ariston Group", description: "Confort térmico" },
    { name: "Datalogic", description: "Automatización industrial" }
  ],
  
  dataAnalysis: {
    summary: "Datos macroeconómicos del 'taller de Europa'. Producción industrial, exportaciones de maquinaria y barómetros de empleo cualificado.",
    capabilities: [
      "Índices de coste laboral",
      "Producción industrial mensual",
      "Exportación de maquinaria",
      "Inversión en bienes de equipo"
    ],
    uniqueValue: "Fuente oficial de datos laborales y productivos del mayor sector industrial italiano, referencia para toda la manufactura mediterránea."
  },
  
  useCases: [
    { id: "labor-cost", title: "Índice de Coste Laboral Metalmecánico", description: "Salarios reales por categoría profesional (Obrero, Empleado, Cuadro).", type: "index" },
    { id: "industrial-production", title: "Producción Industrial Metalmecánica", description: "Volúmenes de fabricación ajustados estacionalmente.", type: "index" },
    { id: "machinery-export", title: "Exportación de Maquinaria Herramienta", description: "Flujos comerciales hacia Alemania, EE.UU. y China.", type: "index" },
    { id: "capex-investment", title: "Inversión en Bienes de Equipo", description: "Datos de compra de nueva maquinaria (Capex).", type: "index" },
    { id: "capacity-usage", title: "Uso de Capacidad Instalada", description: "Porcentaje de utilización de plantas fabriles.", type: "benchmark" },
    { id: "workplace-safety", title: "Seguridad Laboral", description: "Tasas de incidencia de accidentes en el sector metal.", type: "index" },
    { id: "vocational-training", title: "Formación Profesional", description: "Estadísticas de aprendices y formación dual en fábricas.", type: "index" },
    { id: "corporate-welfare", title: "Welfare Empresarial", description: "Datos sobre beneficios sociales ofrecidos en convenios de empresa.", type: "benchmark" },
    { id: "absenteeism", title: "Absentismo Laboral", description: "Tasas medias de ausencias por enfermedad en planta.", type: "benchmark" },
    { id: "ppi-metal", title: "Precios de Producción Industrial", description: "Inflación a puerta de fábrica (PPI) del sector.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const hagueSecurityDelta: PremiumPartner = {
  id: "hsd",
  name: "The Hague Security Delta",
  fullName: "HSD - Security Cluster",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Seguridad, Ciberseguridad y Forense",
  
  authorityContext: {
    narrative: "HSD (Security Delta) es el clúster de seguridad líder en Europa. Ubicado en La Haya (ciudad de la paz y la justicia), agrupa a empresas, gobiernos e instituciones de conocimiento centradas en la ciberseguridad, la seguridad nacional y la forense digital. Es un nodo único para datos sobre amenazas digitales, protección de infraestructuras y tecnología de seguridad urbana.",
    keyStats: [
      { value: "300+", label: "Organizaciones Miembros" },
      { value: "#1", label: "Hub de Ciberseguridad en EU" },
      { value: "Europol", label: "Partner Institucional" }
    ],
    headquarters: "La Haya, Países Bajos"
  },
  
  ecosystem: [
    { name: "Thales Nederland", description: "Sistemas de defensa y seguridad" },
    { name: "Fox-IT (NCC Group)", description: "Ciberseguridad de alto nivel" },
    { name: "Siemens", description: "Seguridad de infraestructuras" },
    { name: "KPN Security", description: "Seguridad de telecomunicaciones" },
    { name: "TNO", description: "Organización de investigación aplicada" },
    { name: "EclecticIQ", description: "Inteligencia de amenazas" },
    { name: "Europol", description: "Partner institucional europeo" },
    { name: "Deloitte Cyber Risk", description: "Consultoría de ciberriesgo" }
  ],
  
  dataAnalysis: {
    summary: "Inteligencia sobre cibercrimen, tecnologías de encriptación y seguridad física inteligente. Datos vitales para departamentos de IT y Risk Management.",
    capabilities: [
      "Tendencias de phishing",
      "Estadísticas de ransomware",
      "Innovación en criptografía",
      "Forense digital"
    ],
    uniqueValue: "Único ecosistema europeo que combina seguridad física, ciberseguridad y forense bajo el paraguas de las instituciones de justicia internacional."
  },
  
  useCases: [
    { id: "phishing-trends", title: "Tendencias de Phishing en Benelux", description: "Vectores de ataque más comunes detectados en empresas holandesas.", type: "index" },
    { id: "ransomware-stats", title: "Ransomware en Infraestructuras", description: "Estadísticas anonimizadas de incidentes y rescates.", type: "risk" },
    { id: "ciso-salaries", title: "Salarios de CISO y Analistas SOC", description: "Remuneración de expertos en seguridad en La Haya.", type: "benchmark" },
    { id: "smart-cameras", title: "Adopción de Cámaras Inteligentes", description: "Datos de despliegue de videovigilancia con IA en espacios públicos.", type: "index" },
    { id: "security-clearance", title: "Tiempos de Security Clearance", description: "Duración media de procesos de habilitación de seguridad para personal.", type: "benchmark" },
    { id: "post-quantum", title: "Innovación en Criptografía Post-Cuántica", description: "Estado de proyectos piloto de encriptación resistente a cuántica.", type: "strategy" },
    { id: "port-security", title: "Seguridad Portuaria (Róterdam)", description: "Datos de tecnologías de escaneo físico de contenedores.", type: "capacity" },
    { id: "security-drones", title: "Drones de Seguridad", description: "Uso de UAVs para vigilancia perimetral automatizada.", type: "index" },
    { id: "gdpr-stats", title: "Protección de Datos (GDPR)", description: "Estadísticas de multas y notificaciones de brechas de datos en NL.", type: "index" },
    { id: "digital-forensics", title: "Forense Digital", description: "Demanda de servicios de recuperación de datos y análisis de evidencias.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const habitatSustentavel: PremiumPartner = {
  id: "habitat-sustentavel",
  name: "Cluster Habitat Sustentável",
  fullName: "Cluster do Habitat Sustentável",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Construcción Sostenible y Materiales Naturales",
  
  authorityContext: {
    narrative: "El Cluster Habitat Sustentável conecta la riqueza natural de Portugal (piedra, corcho, cerámica, madera) con la construcción del futuro. Enfocados en la sostenibilidad y la economía circular, promueven materiales que descarbonizan la edificación. Son el nodo para acceder a datos sobre Declaraciones Ambientales de Producto (DAP/EPD) y materiales de construcción ecológicos.",
    keyStats: [
      { value: "#1", label: "Exportador Mundial de Corcho" },
      { value: "100+", label: "Empresas de Materiales" },
      { value: "EPD", label: "Certificaciones Ambientales" }
    ],
    headquarters: "Porto, Portugal"
  },
  
  ecosystem: [
    { name: "Corticeira Amorim", description: "Líder mundial en corcho - aislamiento" },
    { name: "Secil", description: "Cemento y materiales de construcción" },
    { name: "Revigrés", description: "Cerámica y porcelanato" },
    { name: "Saint-Gobain Portugal", description: "Soluciones constructivas" },
    { name: "CIN", description: "Pinturas y recubrimientos" },
    { name: "Sonae Arauco", description: "Tableros de madera derivados" },
    { name: "Filstone", description: "Piedra natural" },
    { name: "Universidade de Aveiro", description: "I+D en materiales" }
  ],
  
  dataAnalysis: {
    summary: "Datos de huella de carbono de materiales, eficiencia térmica del corcho y reciclabilidad de residuos de construcción.",
    capabilities: [
      "Propiedades térmicas del corcho",
      "Huella de carbono de cemento",
      "Reciclaje de residuos cerámicos",
      "Declaraciones ambientales EPD"
    ],
    uniqueValue: "Único clúster europeo especializado en materiales de construcción naturales y sostenibles con datos certificados de impacto ambiental."
  },
  
  useCases: [
    { id: "cork-insulation", title: "Aislamiento Térmico de Corcho", description: "Datos técnicos de conductividad y rendimiento del aglomerado de corcho expandido.", type: "benchmark" },
    { id: "cement-carbon", title: "Huella de Carbono del Cemento", description: "Datos de emisiones de CO2 por tonelada de clinker producido.", type: "index" },
    { id: "stone-durability", title: "Durabilidad de Piedra Natural", description: "Ensayos de resistencia para fachadas y pavimentos exteriores.", type: "benchmark" },
    { id: "ceramic-recycling", title: "Reciclaje de Residuos Cerámicos", description: "Volúmenes de material recuperado reincorporado al proceso productivo.", type: "index" },
    { id: "voc-emissions", title: "Calidad del Aire Interior (VOCs)", description: "Emisiones de compuestos orgánicos volátiles de pinturas y barnices.", type: "benchmark" },
    { id: "water-efficiency", title: "Eficiencia Hídrica en Grifería", description: "Datos de consumo de nuevos dispositivos sanitarios fabricados en el clúster.", type: "benchmark" },
    { id: "export-prices", title: "Precios de Exportación de Materiales", description: "Valor por tonelada de mármol y granito portugués.", type: "cost" },
    { id: "modular-wood", title: "Construcción Modular en Madera", description: "Capacidad de producción de estructuras prefabricadas.", type: "capacity" },
    { id: "epd-database", title: "Declaraciones Ambientales (EPD)", description: "Base de datos de productos con certificación ambiental verificada.", type: "directory" },
    { id: "urban-rehab", title: "Rehabilitación Urbana", description: "Datos de materiales utilizados en la renovación de centros históricos (Lisboa/Oporto).", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const ufe: PremiumPartner = {
  id: "ufe",
  name: "UFE",
  fullName: "Union Française de l'Électricité",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Electricidad y Transición Energética",
  
  authorityContext: {
    narrative: "La Union Française de l'Électricité (UFE) representa a todo el sector eléctrico francés: productores, gestores de redes y comercializadores. Francia es el 'banco de energía' de Europa gracias a su parque nuclear, y la UFE gestiona los datos de este sistema masivo. Su foco es la descarbonización, la seguridad de suministro nuclear y la electrificación de usos (movilidad y calefacción).",
    keyStats: [
      { value: "56", label: "Reactores Nucleares" },
      { value: "70%", label: "Electricidad Nuclear" },
      { value: "#1", label: "Exportador Eléctrico EU" }
    ],
    headquarters: "París, Francia"
  },
  
  ecosystem: [
    { name: "EDF", description: "Electricité de France - Nuclear/Hidro" },
    { name: "Engie", description: "Renovables y térmico" },
    { name: "Enedis", description: "Distribución eléctrica - 95% del territorio" },
    { name: "RTE", description: "Red de Transporte de Electricidad" },
    { name: "TotalEnergies", description: "División electricidad y renovables" },
    { name: "Dalkia", description: "Servicios energéticos" },
    { name: "Vinci Energies", description: "Infraestructuras eléctricas" },
    { name: "Eiffage Énergie", description: "Instalaciones eléctricas" }
  ],
  
  dataAnalysis: {
    summary: "Datos críticos sobre disponibilidad nuclear, exportaciones de electricidad a vecinos europeos y el despliegue de bombas de calor.",
    capabilities: [
      "Disponibilidad nuclear",
      "Flujos de interconexión",
      "Precios spot/futuros",
      "Electrificación de usos"
    ],
    uniqueValue: "Acceso a datos del mayor sistema eléctrico nuclear del mundo occidental, referencia para la seguridad energética europea."
  },
  
  useCases: [
    { id: "nuclear-availability", title: "Disponibilidad del Parque Nuclear", description: "Calendario de paradas y mantenimiento de reactores (afecta precio spot europeo).", type: "capacity" },
    { id: "realtime-consumption", title: "Consumo Eléctrico en Tiempo Real", description: "Curvas de carga nacionales y regionales (Eco2mix).", type: "index" },
    { id: "interconnections", title: "Interconexiones Fronterizas", description: "Flujos de exportación/importación con España, Alemania y UK.", type: "index" },
    { id: "heat-pumps", title: "Instalación de Bombas de Calor", description: "Estadísticas de sustitución de calderas de gas/fuel por eléctricas.", type: "index" },
    { id: "renewables-connection", title: "Conexión de Renovables a Red", description: "Tiempos de espera y capacidad de acogida para nuevos parques solares.", type: "capacity" },
    { id: "wholesale-prices", title: "Precios Mayoristas (Spot/Futuros)", description: "Evolución del precio del MWh en el mercado francés.", type: "cost" },
    { id: "ev-charging", title: "Electrificación de Flotas", description: "Datos de consumo de nuevos puntos de recarga de vehículos.", type: "index" },
    { id: "pumped-hydro", title: "Almacenamiento Hidráulico (Bombeo)", description: "Niveles de reservas en presas para gestión de picos.", type: "capacity" },
    { id: "self-consumption", title: "Autoconsumo Solar", description: "Crecimiento de instalaciones fotovoltaicas residenciales e industriales.", type: "index" },
    { id: "energy-jobs", title: "Empleo en el Sector Eléctrico", description: "Necesidades de formación para soldadores nucleares y técnicos de red.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 8: MODA CIRCULAR, CERÁMICA Y ELECTRÓNICA
// ============================================

export const distrettoTessile: PremiumPartner = {
  id: "distretto-tessile",
  name: "Distretto Tessile",
  fullName: "Distretto Tessile di Prato",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Textil, Moda y Economía Circular",
  
  authorityContext: {
    narrative: "El Distretto Tessile di Prato (Toscana) es el centro textil más grande de Europa. Pero su valor real hoy es la Economía Circular. Prato lleva 150 años reciclando lana (el famoso 'lana cardata'). Mientras el mundo apenas empieza a hablar de moda sostenible, Prato ya tiene la infraestructura industrial para procesar toneladas de ropa usada y convertirla en tejido de lujo. Es el nodo global para datos de reciclaje textil y tejidos de lana.",
    keyStats: [
      { value: "#1", label: "Centro Textil de Europa" },
      { value: "150+", label: "Años Reciclando Lana" },
      { value: "7.000+", label: "Empresas Textiles" }
    ],
    headquarters: "Prato, Toscana"
  },
  
  ecosystem: [
    { name: "Manteco", description: "Líder mundial en lana premium reciclada (proveedor de Zara/H&M/Gucci)" },
    { name: "Lanificio dell'Olivo", description: "Hilos de fantasía" },
    { name: "Pontetorto", description: "Tejidos deportivos y técnicos" },
    { name: "Beste", description: "Acabados textiles y confección" },
    { name: "Lineapiù Italia", description: "Hilados de alta gama" },
    { name: "Pecci Filati", description: "Hilados de lujo" },
    { name: "Rifò", description: "Marca nativa de moda circular" },
    { name: "Marini Industrie", description: "Tejidos innovadores" }
  ],
  
  dataAnalysis: {
    summary: "Dueños del dato sobre residuos textiles, consumo de agua en tintorería y certificaciones sostenibles (GRS, RWS). Esenciales para cualquier marca de moda que necesite medir su huella Scope 3.",
    capabilities: [
      "Reciclaje textil industrial",
      "Certificaciones sostenibles",
      "Consumo de agua en tintorería",
      "Tendencias de color adelantadas"
    ],
    uniqueValue: "Acceso al único hub industrial del mundo con 150 años de experiencia en economía circular textil, referencia global para moda sostenible."
  },
  
  useCases: [
    { id: "recycled-wool-index", title: "Índice de Precios de Lana Reciclada", description: "Coste por kg de materia prima regenerada vs. virgen.", type: "index" },
    { id: "recycling-capacity", title: "Capacidad de Reciclaje Textil", description: "Toneladas de ropa post-consumo que el distrito puede procesar mensualmente.", type: "capacity" },
    { id: "water-dyeing", title: "Consumo de Agua en Teñido", description: "Benchmarks de eficiencia hídrica en tintorerías industriales.", type: "benchmark" },
    { id: "grs-certification", title: "Certificación GRS", description: "Base de datos de proveedores certificados para trazabilidad.", type: "directory" },
    { id: "yarn-inventory", title: "Inventario de Stock de Hilos", description: "Disponibilidad de hilados en almacén para 'Pronto Moda'.", type: "capacity" },
    { id: "color-trends", title: "Tendencias de Color (Adelantadas)", description: "Datos de laboratorio sobre colores que se están tiñendo para próxima temporada.", type: "forecast" },
    { id: "finishing-energy", title: "Costes Energéticos de Acabado", description: "Impacto del gas natural en secado y planchado industrial.", type: "cost" },
    { id: "wastewater-sludge", title: "Gestión de Lodos de Depuradora", description: "Datos de tratamiento de aguas residuales industriales (sistema GIDA).", type: "benchmark" },
    { id: "waste-composition", title: "Composición de Residuos Textiles", description: "Análisis de materiales entrantes (algodón vs sintéticos) para reciclaje.", type: "index" },
    { id: "wool-exports", title: "Exportación de Tejidos de Lana", description: "Flujos comerciales hacia confeccionistas en Asia y Europa del Este.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const distrettoCeramica: PremiumPartner = {
  id: "distretto-ceramica",
  name: "Distretto della Ceramica",
  fullName: "Distretto Ceramico di Sassuolo",
  country: { code: "IT", flag: "🇮🇹", name: "Italia" },
  vertical: "Materiales de Construcción y Diseño",
  
  authorityContext: {
    narrative: "El Distretto della Ceramica en Sassuolo (Emilia-Romaña) produce el 80% de la cerámica italiana. Aquí se inventaron las baldosas de gran formato y ultra-finas. Es una industria intensiva en gas y arcilla, que combina diseño de alta costura con ingeniería pesada. Para ProcureData, este nodo ofrece datos sobre costes energéticos industriales, importación de arcillas y tendencias globales de diseño de interiores.",
    keyStats: [
      { value: "80%", label: "Producción Cerámica Italiana" },
      { value: "20-30%", label: "Coste = Energía" },
      { value: "#1", label: "Innovación Gran Formato" }
    ],
    headquarters: "Sassuolo, Emilia-Romaña"
  },
  
  ecosystem: [
    { name: "Marazzi Group", description: "Líder mundial (parte de Mohawk)" },
    { name: "Florim", description: "Cerámica de diseño y B Corp" },
    { name: "Iris Ceramica Group", description: "Innovación y sostenibilidad" },
    { name: "Panaria Group", description: "Cerámica de lujo" },
    { name: "Laminam", description: "Líder en tablas de gran formato" },
    { name: "Atlas Concorde", description: "Cerámica internacional" },
    { name: "Kerakoll", description: "Adhesivos y química verde para construcción" },
    { name: "System Ceramics", description: "Maquinaria para cerámica (Coesia)" }
  ],
  
  dataAnalysis: {
    summary: "Datos críticos sobre consumo de gas natural (el 20-30% del coste del azulejo es energía), logística de exportación y patentes de diseño.",
    capabilities: [
      "Impacto del precio del gas",
      "Importación de arcillas",
      "Tendencias de diseño digital",
      "Huella de carbono por m²"
    ],
    uniqueValue: "Acceso a datos del mayor hub cerámico del mundo, donde el precio del gas TTF impacta directamente en el coste final del producto."
  },
  
  useCases: [
    { id: "gas-impact", title: "Impacto del Precio del Gas (TTF)", description: "Correlación directa entre coste energético y precio de salida de fábrica.", type: "cost" },
    { id: "clay-imports", title: "Importación de Arcillas Blancas", description: "Datos de suministro desde Ucrania y Turquía (materias primas críticas).", type: "risk" },
    { id: "large-format-capacity", title: "Capacidad de Gran Formato", description: "Metros cuadrados disponibles de placas XXL (>3 metros).", type: "capacity" },
    { id: "design-trends", title: "Tendencias de Diseño (Inkjet Digital)", description: "Patrones más impresos (mármol, madera, cemento) por mercado.", type: "forecast" },
    { id: "carbon-footprint", title: "Huella de Carbono por m²", description: "Datos EPD (Environmental Product Declaration) promedio del sector.", type: "benchmark" },
    { id: "maritime-exports", title: "Logística de Exportación Marítima", description: "Volúmenes de contenedores hacia EE.UU. (principal mercado).", type: "index" },
    { id: "grinding-water", title: "Consumo de Agua en Molienda", description: "Datos de recuperación de aguas de proceso (circuito cerrado).", type: "benchmark" },
    { id: "packaging-costs", title: "Precios de Embalaje", description: "Costes logísticos auxiliares (palets y plástico).", type: "cost" },
    { id: "antibacterial-surfaces", title: "Superficies Antibacterianas", description: "Ventas de cerámica con tratamiento de plata activo.", type: "index" },
    { id: "finished-stock", title: "Stock de Producto Terminado", description: "Niveles de inventario en almacenes reguladores.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const produtech: PremiumPartner = {
  id: "produtech",
  name: "Produtech",
  fullName: "Pólo das Tecnologias de Produção",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Tecnologías de Producción y Maquinaria",
  
  authorityContext: {
    narrative: "Produtech es el clúster de las tecnologías de producción en Portugal. Agrupa a los fabricantes de la maquinaria que hace funcionar a la industria portuguesa tradicional (corcho, calzado, textil, moldes). Son expertos en automatización flexible y robótica adaptada a PYMEs. Su valor está en la eficiencia industrial y la ingeniería a medida.",
    keyStats: [
      { value: "#3", label: "Exportador Mundial de Moldes" },
      { value: "85%", label: "Export. Maquinaria a UE" },
      { value: "200+", label: "Empresas de Producción" }
    ],
    headquarters: "Oporto, Portugal"
  },
  
  ecosystem: [
    { name: "Colep Packaging", description: "Líder en envases metálicos y aerosoles" },
    { name: "EFACEC", description: "Energía, ingeniería y movilidad" },
    { name: "Amorim Cork Composites", description: "Tecnología de corcho" },
    { name: "A. Silva Matos", description: "Tanques y estructuras metálicas" },
    { name: "Silampos", description: "Menaje metálico y acero" },
    { name: "Flow Technology", description: "Software industrial MES" },
    { name: "Introsys", description: "Automatización y robótica para automoción" },
    { name: "CEIIA", description: "Centro de Ingeniería y Desarrollo de Producto" }
  ],
  
  dataAnalysis: {
    summary: "Datos sobre eficiencia OEE en industrias ligeras, consumo energético en manufactura y exportación de moldes (Portugal es potencia mundial en moldes de inyección).",
    capabilities: [
      "Exportación de moldes de inyección",
      "Eficiencia OEE en PYMEs",
      "Robotización de industria tradicional",
      "Digitalización de planta"
    ],
    uniqueValue: "Acceso a datos del tercer exportador mundial de moldes de inyección, especializado en automatización para industrias tradicionales."
  },
  
  useCases: [
    { id: "mold-exports", title: "Exportación de Moldes de Inyección", description: "Datos de pedidos de moldes para industria automotriz alemana.", type: "index" },
    { id: "sme-energy-efficiency", title: "Eficiencia Energética en PYMEs", description: "Benchmarks de consumo kWh en fábricas de tamaño medio.", type: "benchmark" },
    { id: "traditional-robotics", title: "Robótica en Industria Tradicional", description: "Tasa de adopción de robots en fábricas de calzado y corcho.", type: "index" },
    { id: "maintenance-cost", title: "Coste de Mantenimiento Industrial", description: "Gasto medio en reparaciones y repuestos.", type: "cost" },
    { id: "shopfloor-digitalization", title: "Digitalización de Planta", description: "Datos de implementación de software MES/MOM.", type: "index" },
    { id: "cnc-capacity", title: "Capacidad de Mecanizado CNC", description: "Horas disponibles en talleres de precisión portugueses.", type: "capacity" },
    { id: "batch-traceability", title: "Trazabilidad de Materia Prima", description: "Datos de gestión de lotes en industria metalmecánica.", type: "benchmark" },
    { id: "agv-logistics", title: "Logística Interna (AGVs)", description: "Uso de vehículos guiados automáticamente en almacenes.", type: "index" },
    { id: "robotic-welding", title: "Soldadura Robotizada", description: "Capacidad instalada para estructuras metálicas.", type: "capacity" },
    { id: "production-talent", title: "Talento en Ingeniería de Producción", description: "Salarios y disponibilidad de ingenieros industriales en Oporto/Aveiro.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const secartys: PremiumPartner = {
  id: "secartys",
  name: "Secartys",
  fullName: "Clúster de Electrónica, Energía y TIC",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Electrónica, Energía Solar y Domótica",
  
  authorityContext: {
    narrative: "Secartys es un ecosistema empresarial español con sede en Barcelona que abarca cuatro sectores clave: electrónica, energía solar (Solartys), iluminación (Cicat) y domótica (Domotys). Representan la vanguardia de la tecnología aplicada en España. Son el puente para datos sobre autoconsumo fotovoltaico, ciudades inteligentes y la industria electrónica nacional.",
    keyStats: [
      { value: "4", label: "Sectores Integrados" },
      { value: "500+", label: "Empresas Miembro" },
      { value: "#1", label: "Clúster Electrónico España" }
    ],
    headquarters: "Barcelona, España"
  },
  
  ecosystem: [
    { name: "Simon", description: "Material eléctrico e iluminación (líder nacional)" },
    { name: "Circutor", description: "Eficiencia energética y recarga VE" },
    { name: "Salicru", description: "Sistemas de alimentación ininterrumpida (UPS)" },
    { name: "Wallbox", description: "Cargadores de vehículos eléctricos" },
    { name: "Ignialight", description: "Iluminación LED" },
    { name: "Eurecat", description: "Centro tecnológico" },
    { name: "Premium PSU", description: "Fuentes de alimentación y conversión de energía" },
    { name: "Bender Iberia", description: "Seguridad eléctrica" }
  ],
  
  dataAnalysis: {
    summary: "Datos valiosos sobre despliegue de energía solar, infraestructura de recarga y componentes electrónicos de nicho.",
    capabilities: [
      "Autoconsumo industrial",
      "Infraestructura de recarga VE",
      "Eficiencia iluminación pública",
      "Domótica y Smart Home"
    ],
    uniqueValue: "Acceso al ecosistema integrado de electrónica, solar y domótica más grande de España, con datos únicos sobre autoconsumo y Smart City."
  },
  
  useCases: [
    { id: "industrial-solar", title: "Instalaciones de Autoconsumo Industrial", description: "Datos de MW fotovoltaicos instalados en cubiertas de naves.", type: "index" },
    { id: "ev-charger-sales", title: "Venta de Cargadores de VE", description: "Tendencias de mercado residencial vs. público.", type: "index" },
    { id: "led-efficiency", title: "Eficiencia de Iluminación Pública", description: "Datos de ahorro energético en renovaciones de alumbrado municipal.", type: "benchmark" },
    { id: "battery-storage", title: "Almacenamiento en Baterías", description: "Adopción de baterías domésticas e industriales.", type: "index" },
    { id: "smart-home", title: "Domótica y Smart Home", description: "Dispositivos conectados por hogar en España.", type: "index" },
    { id: "electronics-exports", title: "Exportación de Componentes Electrónicos", description: "Flujos de venta de electrónica de potencia española.", type: "index" },
    { id: "grid-quality", title: "Calidad de Red Eléctrica", description: "Datos de armónicos y perturbaciones en redes industriales.", type: "benchmark" },
    { id: "solar-installers", title: "Escasez de Instaladores Fotovoltaicos", description: "Demanda de mano de obra cualificada para instalaciones.", type: "capacity" },
    { id: "weee-recycling", title: "Reciclaje de Residuos Electrónicos", description: "Volúmenes gestionados de RAEE.", type: "index" },
    { id: "smart-city-tenders", title: "Licitaciones de Smart City", description: "Datos de concursos públicos para sensorización urbana.", type: "directory" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const dspValley: PremiumPartner = {
  id: "dsp-valley",
  name: "DSP Valley",
  fullName: "DSP Valley - Smart Electronic Systems",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Sistemas Electrónicos Inteligentes y Audio",
  
  authorityContext: {
    narrative: "DSP Valley (ahora parte de Sirris/Agoria, pero mantiene identidad de marca) es el clúster de la excelencia en Procesamiento Digital de Señales. Ubicado en el corredor Lovaina-Eindhoven, es un nicho de altísimo valor. Aquí se diseñan los algoritmos de audio de tu audífono, los sensores de radar de tu coche y los chips de IoT. Es Deep Tech puro enfocado en hardware y sistemas embebidos.",
    keyStats: [
      { value: "#1", label: "DSP/Audio en Europa" },
      { value: "IMEC", label: "Centro I+D Líder Mundial" },
      { value: "Deep Tech", label: "Hardware Avanzado" }
    ],
    headquarters: "Lovaina, Bélgica"
  },
  
  ecosystem: [
    { name: "NXP Semiconductors Belgium", description: "RFID y seguridad" },
    { name: "IMEC", description: "Centro de I+D en nanoelectrónica líder mundial" },
    { name: "Melexis", description: "Sensores para automoción" },
    { name: "Cochlear", description: "Implantes auditivos - I+D" },
    { name: "Onsemi", description: "Semiconductores de imagen" },
    { name: "Easics", description: "Diseño de chips ASIC/FPGA" },
    { name: "Septentrio", description: "GPS/GNSS de alta precisión" },
    { name: "Xenics", description: "Cámaras infrarrojas" }
  ],
  
  dataAnalysis: {
    summary: "Datos sobre diseño de chips, tecnología de sensores y propiedad intelectual (IP) en microelectrónica.",
    capabilities: [
      "Diseño de FPGA/ASIC",
      "Sensores de automoción",
      "Tecnología de audio y voz",
      "Visión infrarroja"
    ],
    uniqueValue: "Acceso al epicentro europeo del procesamiento digital de señales, donde IMEC y los líderes de sensores definen el futuro del hardware inteligente."
  },
  
  useCases: [
    { id: "fpga-talent", title: "Talento en Diseño de FPGA/ASIC", description: "Disponibilidad y coste de ingenieros de hardware de élite.", type: "benchmark" },
    { id: "gnss-precision", title: "Precisión de Sensores GNSS", description: "Datos comparativos de tecnologías de posicionamiento por satélite.", type: "benchmark" },
    { id: "automotive-sensors", title: "Innovación en Sensores de Automoción", description: "Nuevas aplicaciones de sensores Hall y presión en EVs.", type: "index" },
    { id: "audio-voice-tech", title: "Tecnología de Audio y Voz", description: "Algoritmos de cancelación de ruido y procesamiento de voz.", type: "index" },
    { id: "chip-prototyping", title: "Capacidad de Prototipado de Chips", description: "Acceso a líneas piloto de fabricación en IMEC.", type: "capacity" },
    { id: "infrared-vision", title: "Visión Infrarroja (SWIR/LWIR)", description: "Aplicaciones industriales de cámaras térmicas.", type: "index" },
    { id: "low-power-iot", title: "Conectividad IoT de Bajo Consumo", description: "Datos de rendimiento de chips LoRa/Sigfox/NB-IoT.", type: "benchmark" },
    { id: "nanoelectronics-patents", title: "Patentes en Nanoelectrónica", description: "Actividad de propiedad intelectual en el clúster.", type: "index" },
    { id: "hardware-startups", title: "Startups de Hardware", description: "Ecosistema de nuevas empresas desarrollando dispositivos físicos.", type: "directory" },
    { id: "edge-ai-efficiency", title: "Consumo Energético de Chips IA", description: "Benchmarks de eficiencia en procesadores de Edge AI.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 9: BIOTECNOLOGÍA, QUÍMICA Y NUEVO ESPACIO
// ============================================

export const biovalleyFrance: PremiumPartner = {
  id: "biovalley-france",
  name: "BioValley",
  fullName: "Pôle de Compétitivité Santé et Biotechnologies",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Salud, Biotecnología y MedTech",
  
  authorityContext: {
    narrative: "BioValley France (anteriormente Alsace BioValley) opera en una ubicación única: la región del Gran Este, fronteriza con Alemania y Suiza. Es un clúster trinacional de facto. Esta región tiene una de las mayores densidades de industria farmacéutica y tecnologías médicas de Europa. Es la puerta de entrada para ensayos clínicos transfronterizos y colaboraciones de I+D entre las potencias científicas europeas.",
    keyStats: [
      { value: "Trinacional", label: "FR-DE-CH" },
      { value: "#1", label: "Cirugía Robótica (IRCAD)" },
      { value: "300+", label: "Empresas MedTech" }
    ],
    headquarters: "Estrasburgo, Francia"
  },
  
  ecosystem: [
    { name: "Lilly France", description: "Producción farmacéutica" },
    { name: "Novartis", description: "Biotech y farma (planta cercana en Basilea/Francia)" },
    { name: "Merck (Millipore)", description: "Ciencias de la vida" },
    { name: "Sanofi", description: "Plantas de producción en Estrasburgo" },
    { name: "Bruker", description: "Instrumentación científica de alto nivel" },
    { name: "IRCAD", description: "Instituto de investigación en cirugía digestiva (líder mundial)" },
    { name: "Transgene", description: "Inmunoterapia" },
    { name: "Alentis Therapeutics", description: "Biotech" }
  ],
  
  dataAnalysis: {
    summary: "Datos estratégicos sobre instrumentación científica, cirugía robótica (gracias al IRCAD) y capacidad de producción farmacéutica en el corazón de Europa.",
    capabilities: [
      "Capacidad CDMO regional",
      "Cirugía mínimamente invasiva",
      "Talento transfronterizo",
      "Instrumentación de laboratorio"
    ],
    uniqueValue: "Acceso al único hub trinacional de biotech de Europa, donde Francia, Alemania y Suiza colaboran en innovación farmacéutica y MedTech."
  },
  
  useCases: [
    { id: "cdmo-capacity", title: "Capacidad de CDMO en la Región", description: "Disponibilidad de líneas de producción para fármacos inyectables de terceros.", type: "capacity" },
    { id: "minimally-invasive", title: "Datos de Cirugía Mínimamente Invasiva", description: "Estadísticas de entrenamiento y adopción de nuevas técnicas quirúrgicas (IRCAD).", type: "index" },
    { id: "cross-border-talent", title: "Talento Transfronterizo", description: "Flujos de investigadores que trabajan entre Francia, Alemania y Suiza.", type: "benchmark" },
    { id: "intl-clinical-trials", title: "Ensayos Clínicos Internacionales", description: "Datos de estudios multicéntricos coordinados desde Alsacia.", type: "index" },
    { id: "lab-instrumentation", title: "Instrumentación de Laboratorio", description: "Tendencias de compra de espectrometría de masas y resonancia magnética.", type: "index" },
    { id: "medtech-startups", title: "Startups de MedTech", description: "Radar de innovación en implantes y dispositivos quirúrgicos.", type: "directory" },
    { id: "lab-space-costs", title: "Costes de Espacio de Laboratorio", description: "Precios de alquiler de laboratorios P2/P3 en bio-incubadoras.", type: "cost" },
    { id: "digital-health-investment", title: "Inversión en Salud Digital", description: "Financiación de proyectos de e-Health en la región.", type: "index" },
    { id: "monoclonal-production", title: "Producción de Anticuerpos Monoclonales", description: "Capacidad instalada para biológicos.", type: "capacity" },
    { id: "life-sciences-patents", title: "Patentes en Ciencias de la Vida", description: "Actividad de propiedad intelectual en el valle del Rin.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const biorn: PremiumPartner = {
  id: "biorn",
  name: "BioRN",
  fullName: "Clúster de Biotecnología Rin-Neckar",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Biología Molecular y Terapias Celulares",
  
  authorityContext: {
    narrative: "BioRN es el clúster de ciencias de la vida de la región Rin-Neckar (Heidelberg). Es uno de los centros de investigación biomédica más fuertes de Europa, hogar del DKFZ (Centro Alemán de Investigación Oncológica) y el EMBL. Su proximidad a la sede de SAP también lo convierte en un hub para la bioinformática y la medicina de datos. Aquí es donde la ciencia básica se convierte en negocio biotecnológico.",
    keyStats: [
      { value: "DKFZ", label: "Centro Oncología Líder" },
      { value: "EMBL", label: "Laboratorio de Biología Molecular" },
      { value: "SAP", label: "Big Data en Salud" }
    ],
    headquarters: "Heidelberg, Alemania"
  },
  
  ecosystem: [
    { name: "Roche Diagnostics", description: "Líder en diagnóstico (Mannheim)" },
    { name: "AbbVie", description: "Inmunología y oncología (sede alemana)" },
    { name: "Heidelberg Pharma", description: "Tecnología ADC para cáncer" },
    { name: "Merck KGaA", description: "Innovación en salud" },
    { name: "BioNTech", description: "Colaboraciones cercanas (Maguncia está cerca)" },
    { name: "Evotec", description: "Descubrimiento de fármacos" },
    { name: "SAP", description: "Plataformas de datos de salud" },
    { name: "DKFZ", description: "Partner científico clave" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de la Oncología y el Diagnóstico. Datos valiosos sobre investigación del cáncer, biomarcadores y digitalización de laboratorios.",
    capabilities: [
      "Investigación oncológica",
      "Validación de biomarcadores",
      "Automatización de laboratorios",
      "Bioinformática SAP/HANA"
    ],
    uniqueValue: "Acceso al epicentro europeo de investigación oncológica, donde DKFZ, EMBL y SAP definen el futuro de la medicina de precisión."
  },
  
  useCases: [
    { id: "tissue-bank", title: "Banco de Tejidos y Datos Oncológicos", description: "Acceso a metadatos anonimizados de investigación del cáncer.", type: "directory" },
    { id: "biomarker-validation", title: "Validación de Biomarcadores", description: "Datos sobre nuevos marcadores para diagnóstico temprano.", type: "index" },
    { id: "lab-automation", title: "Automatización de Laboratorios", description: "Tendencias en el uso de robótica para screening de alto rendimiento (HTS).", type: "index" },
    { id: "tech-transfer", title: "Transferencia Tecnológica", description: "Estadísticas de spin-offs universitarias creadas en Heidelberg.", type: "index" },
    { id: "public-rd-funding", title: "Financiación Pública de I+D", description: "Mapa de grants y subvenciones federales alemanas para biotech.", type: "directory" },
    { id: "genomic-sequencing", title: "Secuenciación Genómica", description: "Capacidad de secuenciación NGS disponible en la región.", type: "capacity" },
    { id: "oncology-trials", title: "Ensayos Clínicos en Oncología", description: "Reclutamiento para terapias avanzadas (CAR-T, etc.).", type: "index" },
    { id: "bioinformatics", title: "Bioinformática", description: "Uso de plataformas SAP/HANA para análisis de Big Data biológico.", type: "benchmark" },
    { id: "postdoc-salaries", title: "Salarios de Investigadores Post-Doc", description: "Benchmarks de remuneración para talento científico.", type: "benchmark" },
    { id: "pharma-startup-deals", title: "Colaboración Pharma-Startup", description: "Número de acuerdos de licencia firmados en el clúster.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const feique: PremiumPartner = {
  id: "feique",
  name: "FEIQUE",
  fullName: "Federación Empresarial de la Industria Química Española",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Industria Química y Refino",
  
  authorityContext: {
    narrative: "La Federación Empresarial de la Industria Química Española (FEIQUE) representa un sector que genera el 5,8% del PIB español. España es una potencia química, especialmente en los polos de Tarragona (el mayor hub petroquímico del sur de Europa) y Huelva. FEIQUE gestiona los datos de un sector exportador masivo, clave para el hidrógeno verde y los fertilizantes.",
    keyStats: [
      { value: "5,8%", label: "PIB Español" },
      { value: "#1", label: "Hub Petroquímico Sur Europa" },
      { value: "3.000+", label: "Empresas Químicas" }
    ],
    headquarters: "Madrid, España"
  },
  
  ecosystem: [
    { name: "Repsol Química", description: "Petroquímica y plásticos" },
    { name: "Cepsa", description: "Química y energía" },
    { name: "Ercros", description: "Química básica y farmacia" },
    { name: "Fertiberia", description: "Fertilizantes y amoniaco verde" },
    { name: "BASF Española", description: "Gran centro de producción en Tarragona" },
    { name: "Covestro", description: "Producción de cloro y poliuretanos" },
    { name: "Dow Chemical Ibérica", description: "Plásticos de alto rendimiento" },
    { name: "Ube Corporation Europe", description: "Química fina y poliamidas" }
  ],
  
  dataAnalysis: {
    summary: "Datos críticos sobre precios de la energía (el gas es la materia prima), exportaciones portuarias y seguridad industrial. Esencial para entender el suministro de materias primas en el Mediterráneo.",
    capabilities: [
      "Producción de hidrógeno verde",
      "Precios de fertilizantes",
      "Consumo de gas industrial",
      "Seguridad de procesos (Seveso)"
    ],
    uniqueValue: "Acceso a datos del mayor hub petroquímico del sur de Europa, clave para la transición al hidrógeno verde y la industria de fertilizantes."
  },
  
  useCases: [
    { id: "green-hydrogen", title: "Producción de Hidrógeno Verde", description: "Capacidad de electrólisis proyectada en los valles de hidrógeno españoles.", type: "capacity" },
    { id: "fertilizer-prices", title: "Precios de Fertilizantes Agrícolas", description: "Evolución del coste de la urea y nitratos (crítico para el agro).", type: "index" },
    { id: "industrial-gas", title: "Consumo de Gas Industrial", description: "Datos de demanda de gas natural en los polos químicos.", type: "index" },
    { id: "plastics-exports", title: "Exportación de Plásticos", description: "Volúmenes de polietileno y polipropileno exportados desde puertos españoles.", type: "index" },
    { id: "intermodal-transport", title: "Transporte Intermodal", description: "Uso del Corredor Mediterráneo para logística química.", type: "benchmark" },
    { id: "seveso-compliance", title: "Seguridad de Procesos (Seveso)", description: "Datos agregados de cumplimiento de normativa de accidentes graves.", type: "benchmark" },
    { id: "decarbonization-investment", title: "Inversión en Descarbonización", description: "CAPEX destinado a captura de carbono y eficiencia.", type: "index" },
    { id: "chemical-wages", title: "Convenio Colectivo Químico", description: "Tablas salariales y condiciones laborales del sector (referente en España).", type: "benchmark" },
    { id: "chemical-recycling", title: "Reciclaje Químico", description: "Proyectos piloto para convertir residuos plásticos en aceite de pirólisis.", type: "index" },
    { id: "chlor-alkali-supply", title: "Suministro de Cloro-Sosa", description: "Disponibilidad de cloro para tratamiento de aguas y PVC.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const essenscia: PremiumPartner = {
  id: "essenscia",
  name: "Essenscia",
  fullName: "Federatie van de Belgische Chemie en Life Sciences",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Química de Alto Valor y Ciencias de la Vida",
  
  authorityContext: {
    narrative: "Bélgica es, per cápita, el campeón mundial de la química y los plásticos. Essenscia es la federación que agrupa este poderío. Con el Puerto de Amberes como pulmón, este ecosistema es vital para la economía belga. A diferencia de otros clústeres puramente industriales, Essenscia integra fuertemente la Biofarma (Janssen, Pfizer), creando un híbrido único entre química pesada y vacunas.",
    keyStats: [
      { value: "#2", label: "Hub Químico Mundial" },
      { value: "Janssen+Pfizer", label: "Vacunas Globales" },
      { value: "Amberes", label: "Puerto Químico Clave" }
    ],
    headquarters: "Bruselas, Bélgica"
  },
  
  ecosystem: [
    { name: "Janssen Pharmaceutica (J&J)", description: "Uno de los mayores campus de I+D del mundo" },
    { name: "Solvay", description: "Historia viva de la química (ahora Syensqo y Solvay)" },
    { name: "Pfizer", description: "Planta clave en Puurs (producción vacunas COVID)" },
    { name: "Ineos", description: "Inversión masiva en craqueo de etano (Proyecto One)" },
    { name: "Borealis", description: "Poliolefinas y fertilizantes" },
    { name: "Umicore", description: "Tecnología de materiales y reciclaje" },
    { name: "Agfa-Gevaert", description: "Imagen y soluciones IT" },
    { name: "Kaneka", description: "Biopolímeros y química" }
  ],
  
  dataAnalysis: {
    summary: "Líderes mundiales en datos de logística farmacéutica, I+D químico y patentes. Bélgica es un hub logístico, por lo que sus datos de exportación son un termómetro global.",
    capabilities: [
      "Gasto en I+D por empleado",
      "Exportación de vacunas",
      "Logística de cadena de frío",
      "Reciclaje de baterías"
    ],
    uniqueValue: "Acceso al segundo hub químico mundial, donde química pesada y producción de vacunas conviven en un ecosistema único de innovación."
  },
  
  useCases: [
    { id: "rd-per-employee", title: "Gasto en I+D por Empleado", description: "Bélgica lidera la inversión privada en innovación química.", type: "benchmark" },
    { id: "vaccine-exports", title: "Exportación de Vacunas", description: "Volúmenes y destinos de productos inmunológicos desde aeropuertos belgas.", type: "index" },
    { id: "cold-chain", title: "Logística de Cadena de Frío", description: "Capacidad de almacenamiento a temperatura controlada en hubs logísticos.", type: "capacity" },
    { id: "bio-based-patents", title: "Química Sostenible", description: "Patentes de nuevos materiales bio-basados.", type: "index" },
    { id: "stem-talent", title: "Talento STEM", description: "Graduados en química e ingeniería disponibles en Flandes y Valonia.", type: "benchmark" },
    { id: "battery-recycling", title: "Reciclaje de Baterías", description: "Capacidad de recuperación de metales valiosos (Umicore).", type: "capacity" },
    { id: "industrial-co2", title: "Emisiones de CO2 Industriales", description: "Hoja de ruta de descarbonización del clúster químico.", type: "index" },
    { id: "environmental-permits", title: "Permisos Ambientales", description: "Tiempos de tramitación para nuevas plantas industriales.", type: "benchmark" },
    { id: "port-industry-integration", title: "Integración Puerto-Industria", description: "Flujos de materias primas entre terminales marítimas y plantas.", type: "index" },
    { id: "lims-adoption", title: "Digitalización de Laboratorios", description: "Adopción de LIMS y automatización en I+D.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const aedClusterPortugal: PremiumPartner = {
  id: "aed-cluster-portugal",
  name: "AED Cluster",
  fullName: "Cluster da Aeronáutica, Espaço e Defesa",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Aeronáutica, Espacio y Defensa",
  
  authorityContext: {
    narrative: "Portugal ha emergido silenciosamente como un proveedor crítico en la cadena aeroespacial europea. AED Cluster Portugal (Aeronautics, Space and Defence) coordina este crecimiento. Con una fuerte base de ingeniería y costes competitivos, Portugal atrae inversión de Embraer y Airbus. Además, lideran en el nicho de drones y vigilancia marítima debido a su inmensa zona económica exclusiva (Atlántico).",
    keyStats: [
      { value: "Embraer+OGMA", label: "Hub MRO Europeo" },
      { value: "#1", label: "Drones Marítimos UE" },
      { value: "Atlántico", label: "Zona Económica Inmensa" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "Embraer Portugal", description: "Fábricas de aeroestructuras y compuestos en Évora" },
    { name: "OGMA", description: "Mantenimiento MRO y fabricación (participada por Embraer)" },
    { name: "Tekever", description: "Líder europeo en drones de vigilancia marítima" },
    { name: "CEIIA", description: "Desarrollo de producto e ingeniería avanzada" },
    { name: "GMV Portugal", description: "Sistemas espaciales y defensa" },
    { name: "LusoSpace", description: "Tecnología espacial" },
    { name: "Omnidea", description: "Sistemas espaciales y energía" },
    { name: "Critical Software", description: "Software crítico para seguridad (proveedor NASA/ESA)" }
  ],
  
  dataAnalysis: {
    summary: "Datos emergentes sobre operaciones de drones BVLOS (más allá de la línea de vista), ingeniería de software crítico y mantenimiento aeronáutico.",
    capabilities: [
      "Mantenimiento aeronáutico MRO",
      "Vigilancia marítima con drones",
      "Software crítico DO-178C",
      "Fabricación de composites"
    ],
    uniqueValue: "Acceso al hub emergente de drones marítimos y aeroespacial de Europa, con costes competitivos y expertise en software crítico certificado."
  },
  
  useCases: [
    { id: "mro-slots", title: "Mantenimiento Aeronáutico (MRO)", description: "Disponibilidad de slots para revisión de aviones comerciales y militares en OGMA.", type: "capacity" },
    { id: "maritime-surveillance", title: "Vigilancia Marítima con Drones", description: "Datos de misiones de control de pesca y fronteras en el Atlántico.", type: "index" },
    { id: "aerospace-engineering-costs", title: "Costes de Ingeniería Aeroespacial", description: "Tarifas hora competitivas para desarrollo de sistemas embebidos.", type: "cost" },
    { id: "cabin-interiors", title: "Fabricación de Interiores de Avión", description: "Capacidad de producción de paneles y componentes de cabina.", type: "capacity" },
    { id: "new-space", title: "New Space", description: "Lanzamiento de microsatélites y datos de observación terrestre (Azores).", type: "index" },
    { id: "critical-software", title: "Certificación de Software Crítico", description: "Validación de código DO-178C para aviónica.", type: "benchmark" },
    { id: "aerospace-molds", title: "Moldes para Aeronáutica", description: "Capacidad de la industria de moldes portuguesa aplicada al sector aeroespacial.", type: "capacity" },
    { id: "pilot-training", title: "Formación de Pilotos", description: "Estadísticas de escuelas de vuelo (clima favorable todo el año).", type: "index" },
    { id: "naval-defense", title: "Defensa Naval", description: "Proyectos de integración de sistemas en patrulleras oceánicas.", type: "index" },
    { id: "aerospace-composites", title: "Composites Aeronáuticos", description: "Producción automatizada de piezas estructurales en Évora.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 10: TIERRA, ACERO Y HORMIGÓN
// ============================================

export const dbv: PremiumPartner = {
  id: "dbv",
  name: "DBV",
  fullName: "Deutscher Bauernverband",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Agricultura y Ganadería",
  
  authorityContext: {
    narrative: "El Deutscher Bauernverband (DBV) es la voz de la agricultura alemana. Representa a más de 270.000 explotaciones. En la mayor economía de Europa, el DBV gestiona la intersección entre la producción masiva de alimentos y la estricta regulación ambiental. Son clave para datos sobre cultivos extensivos (cereales, colza), producción porcina y la bioenergía (biogás agrícola), donde Alemania es líder mundial.",
    keyStats: [
      { value: "270.000+", label: "Explotaciones Agrícolas" },
      { value: "#1", label: "Biogás Agrícola UE" },
      { value: "1,25T€", label: "PIB Agroalimentario" }
    ],
    headquarters: "Berlín, Alemania"
  },
  
  ecosystem: [
    { name: "Südzucker", description: "Mayor productor de azúcar de Europa" },
    { name: "DMK Group", description: "Deutsches Milchkontor - Lácteos" },
    { name: "BayWa", description: "Comercio agrícola y energía" },
    { name: "Westfleisch", description: "Cárnicas" },
    { name: "AGRAVIS Raiffeisen", description: "Cooperativa de suministros" },
    { name: "KWS Saat", description: "Semillas y genética vegetal" },
    { name: "CLAAS", description: "Maquinaria agrícola (partner tecnológico)" },
    { name: "Big Dutchman", description: "Equipamiento ganadero" }
  ],
  
  dataAnalysis: {
    summary: "Datos masivos sobre rendimiento de cultivos por hectárea, costes de alimentación animal y producción de biometano. Fundamental para predecir precios en la bolsa de materias primas agrícolas.",
    capabilities: [
      "Índices de precios de cereales",
      "Producción de biogás agrícola",
      "Censo ganadero",
      "Costes de arrendamiento de tierras"
    ],
    uniqueValue: "Acceso al dato agrícola más granular de Europa: rendimientos, precios y regulación ambiental de la potencia agroalimentaria alemana."
  },
  
  useCases: [
    { id: "grain-price-index", title: "Índice de Precios de Cereal Alemán", description: "Cotizaciones en origen de trigo, cebada y maíz en Baviera y Baja Sajonia.", type: "index" },
    { id: "biogas-production", title: "Producción de Biogás Agrícola", description: "TWh generados por digestores de purines y maíz (base energética rural).", type: "index" },
    { id: "pig-census", title: "Censo Porcino", description: "Datos de cabaña ganadera para previsión de oferta cárnica.", type: "index" },
    { id: "land-lease-costs", title: "Costes de Arrendamiento de Tierras (Pachtpreise)", description: "Evolución del precio por hectárea en el este vs. oeste de Alemania.", type: "cost" },
    { id: "fertilizer-usage", title: "Uso de Fertilizantes", description: "Estadísticas de aplicación de nitrógeno (cumplimiento de directiva de nitratos).", type: "benchmark" },
    { id: "rapeseed-harvest", title: "Cosecha de Colza (Rapeseed)", description: "Volumen disponible para aceite alimentario y biodiésel.", type: "index" },
    { id: "animal-health", title: "Salud Animal", description: "Datos agregados de uso de antibióticos en ganadería (reducción progresiva).", type: "benchmark" },
    { id: "machinery-rings", title: "Maquinaria Compartida (Maschinenringe)", description: "Datos de utilización de cosechadoras y tractores en régimen cooperativo.", type: "benchmark" },
    { id: "organic-farming", title: "Agricultura Orgánica", description: "Tasa de conversión de granjas convencionales a 'Bio'.", type: "index" },
    { id: "climate-impact", title: "Impacto Climático en Cosechas", description: "Datos de sequía y rendimiento en tiempo real.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const ltoNederland: PremiumPartner = {
  id: "lto-nederland",
  name: "LTO Nederland",
  fullName: "Land- en Tuinbouw Organisatie Nederland",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Horticultura y AgriTech",
  
  authorityContext: {
    narrative: "LTO Nederland representa a los agricultores más tecnificados del planeta. Los Países Bajos son el segundo mayor exportador agrícola del mundo (después de EE.UU.) con una fracción del terreno. El secreto es la tecnología. LTO gestiona el ecosistema de invernaderos de cristal (Glasshouse horticulture), floricultura y lácteos de ultra-eficiencia. Sus datos son pura agronomía de precisión.",
    keyStats: [
      { value: "#2", label: "Exportador Agrícola Mundial" },
      { value: "10.000+", label: "Hectáreas de Invernaderos" },
      { value: "FloraHolland", label: "Mayor Subasta de Flores" }
    ],
    headquarters: "La Haya, Países Bajos"
  },
  
  ecosystem: [
    { name: "Royal FloraHolland", description: "La mayor subasta de flores del mundo" },
    { name: "FrieslandCampina", description: "Lácteos - Cooperativa global" },
    { name: "The Greenery", description: "Distribución de frutas y verduras" },
    { name: "Koppert Cress", description: "Micro-vegetales gourmet" },
    { name: "Lely", description: "Robótica de ordeño" },
    { name: "Rijk Zwaan", description: "Semillas hortícolas" },
    { name: "Vion Food Group", description: "Cárnicas" },
    { name: "Priva", description: "Climatización de invernaderos" }
  ],
  
  dataAnalysis: {
    summary: "Dueños del dato en agricultura de ambiente controlado, logística de flores y gestión del nitrógeno (un tema político crítico en NL).",
    capabilities: [
      "Clima en invernaderos",
      "Precios de subasta de flores",
      "Robótica agrícola",
      "Gestión del nitrógeno"
    ],
    uniqueValue: "Acceso al laboratorio agrícola más avanzado del mundo: datos de precisión en horticultura, floricultura y producción láctea robotizada."
  },
  
  useCases: [
    { id: "greenhouse-climate", title: "Clima en Invernaderos", description: "Datos de consumo de gas y luz para cultivo de tomate y pimiento bajo cristal.", type: "benchmark" },
    { id: "flower-auction-prices", title: "Precios de Subasta de Flores", description: "Cotizaciones diarias de rosas y tulipanes en Aalsmeer (referencia mundial).", type: "index" },
    { id: "nitrogen-emissions", title: "Emisiones de Nitrógeno", description: "Datos precisos de deposición de nitrógeno por explotación (crítico para permisos).", type: "benchmark" },
    { id: "robotic-milking", title: "Robótica en Granjas", description: "KPIs de rendimiento de robots de ordeño automático.", type: "benchmark" },
    { id: "seed-exports", title: "Exportación de Semillas", description: "Flujos comerciales de genética vegetal de alto valor.", type: "index" },
    { id: "hydroponic-water", title: "Uso de Agua en Hidroponía", description: "Benchmarks de litros/kg de producto en sistemas cerrados.", type: "benchmark" },
    { id: "cold-chain-logistics", title: "Logística de Cadena de Frío", description: "Tiempos de tránsito de perecederos desde Rotterdam al resto de Europa.", type: "benchmark" },
    { id: "geothermal-energy", title: "Energía Geotérmica", description: "Datos de pozos geotérmicos utilizados para calentar invernaderos.", type: "index" },
    { id: "migrant-labor", title: "Mano de Obra Inmigrante", description: "Estadísticas de empleo temporal en campañas de recolección.", type: "index" },
    { id: "milk-prices", title: "Precios de la Leche", description: "'Guaranteed price' pagado por las cooperativas a los granjeros.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const wsm: PremiumPartner = {
  id: "wsm",
  name: "WSM",
  fullName: "Wirtschaftsverband Stahl- und Metallverarbeitung",
  country: { code: "DE", flag: "🇩🇪", name: "Alemania" },
  vertical: "Procesamiento de Metal y Acero",
  
  authorityContext: {
    narrative: "La Wirtschaftsverband Stahl- und Metallverarbeitung (WSM) representa a los 'héroes ocultos' de la industria alemana. No fabrican el coche final, pero fabrican los tornillos, los muelles, las piezas forjadas y estampadas sin las cuales nada funcionaría. Agrupan a 5.000 empresas, mayoritariamente PYMEs familiares (Mittelstand). Son el eslabón crítico de la cadena de suministro metalmecánica europea.",
    keyStats: [
      { value: "5.000+", label: "Empresas Afiliadas" },
      { value: "Mittelstand", label: "PYMEs Familiares" },
      { value: "Tier 2-3", label: "Cadena de Suministro" }
    ],
    headquarters: "Hagen, Alemania"
  },
  
  ecosystem: [
    { name: "Mubea", description: "Componentes de automoción ligeros" },
    { name: "Kirchhoff Automotive", description: "Estructuras de carrocería" },
    { name: "EJOT", description: "Tecnología de fijación/tornillería" },
    { name: "Witzenmann", description: "Elementos metálicos flexibles" },
    { name: "Fuchs Schrauben", description: "Tornillería" },
    { name: "Kern-Liebers", description: "Muelles y resortes de precisión" },
    { name: "Böllhoff", description: "Técnicas de ensamblaje" },
    { name: "Gestamp", description: "Presencia fuerte en Alemania (adquisiciones)" }
  ],
  
  dataAnalysis: {
    summary: "Datos esenciales sobre precios de aleaciones, sobrecostes energéticos (típicos en procesos térmicos) y herramentales.",
    capabilities: [
      "Índice de sobrecoste de aleación",
      "Costes energéticos en forja",
      "Precios de alambrón",
      "Plazos de herramentales"
    ],
    uniqueValue: "Acceso al dato del Mittelstand metalmecánico alemán: costes reales de transformación del acero que determinan los precios finales de la industria."
  },
  
  useCases: [
    { id: "alloy-surcharge", title: "Índice de Sobrecoste de Aleación (Alloy Surcharge)", description: "Recargos mensuales aplicados al acero inoxidable y especial.", type: "index" },
    { id: "forging-energy-cost", title: "Coste de Energía en Forja", description: "Impacto del precio del gas/electricidad en piezas forjadas en caliente.", type: "cost" },
    { id: "wire-rod-prices", title: "Precios de Alambrón (Wire Rod)", description: "Materia prima base para tornillos y muelles.", type: "index" },
    { id: "heat-treatment-capacity", title: "Capacidad de Tratamiento Térmico", description: "Disponibilidad de hornos para endurecimiento de piezas.", type: "capacity" },
    { id: "tooling-lead-times", title: "Plazos de Entrega de Herramentales", description: "Tiempos de espera para fabricación de troqueles y moldes progresivos.", type: "benchmark" },
    { id: "scrap-surcharge", title: "Índice de Chatarra (Scrap Surcharge)", description: "Valor de recuperación de viruta metálica.", type: "index" },
    { id: "fastener-production", title: "Producción de Piezas de Fijación", description: "Volúmenes de tornillería estándar vs. especial.", type: "index" },
    { id: "ig-metall-wages", title: "Salarios en el Metal (Convenio IG Metall)", description: "Costes laborales en la industria transformadora.", type: "benchmark" },
    { id: "cold-forming", title: "Adopción de Conformado en Frío", description: "Tendencias técnicas en estampación.", type: "index" },
    { id: "component-exports", title: "Exportación de Componentes", description: "Flujo de piezas metálicas hacia plantas de ensamblaje extranjeras.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const ffb: PremiumPartner = {
  id: "ffb",
  name: "FFB",
  fullName: "Fédération Française du Bâtiment",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Construcción y Edificación",
  
  authorityContext: {
    narrative: "La Fédération Française du Bâtiment (FFB) es el gigante de la construcción gala. Representa a 50.000 empresas, desde artesanos locales hasta multinacionales globales. Francia tiene una política de vivienda y renovación urbana muy agresiva. La FFB es la fuente de datos para el mercado de la renovación energética (MaPrimeRénov'), la vivienda social y la construcción en madera, impulsada por la normativa RE2020.",
    keyStats: [
      { value: "50.000+", label: "Empresas Miembro" },
      { value: "RE2020", label: "Normativa Sostenible" },
      { value: "MaPrimeRénov'", label: "Renovación Energética" }
    ],
    headquarters: "París, Francia"
  },
  
  ecosystem: [
    { name: "Vinci Construction", description: "Uno de los mayores constructores del mundo" },
    { name: "Bouygues Bâtiment", description: "Edificación y desarrollo" },
    { name: "Eiffage Construction", description: "Infraestructuras y edificación" },
    { name: "Spie Batignolles", description: "Construcción y energía" },
    { name: "Demathieu Bard", description: "Construcción independiente" },
    { name: "Fayat", description: "Construcción y estructura metálica" },
    { name: "NGE", description: "Obras públicas y construcción" },
    { name: "Sogea-Satom", description: "Obras hidráulicas y civiles" }
  ],
  
  dataAnalysis: {
    summary: "Datos sobre volumen de obra residencial, empleo en construcción y costes de materiales en el mercado francés.",
    capabilities: [
      "Índice de coste de construcción",
      "Renovación energética",
      "Venta de vivienda nueva",
      "Construcción en madera"
    ],
    uniqueValue: "Acceso al mercado de construcción francés: datos de obra nueva, renovación energética subvencionada y transición hacia materiales sostenibles."
  },
  
  useCases: [
    { id: "construction-cost-index", title: "Índice de Coste de Construcción (ICC)", description: "Índice oficial trimestral de precios de obra nueva.", type: "index" },
    { id: "energy-renovation", title: "Solicitudes de Renovación Energética", description: "Datos de demanda de aislamiento y cambio de ventanas (subvencionadas).", type: "index" },
    { id: "new-housing-sales", title: "Venta de Vivienda Nueva", description: "Reservas de apartamentos sobre plano en grandes urbes.", type: "index" },
    { id: "apprenticeship", title: "Empleo y Aprendizaje", description: "Cifras de contratación de aprendices en oficios de albañilería.", type: "benchmark" },
    { id: "payment-delays", title: "Impagos en el Sector", description: "Plazos medios de cobro y tasa de fallidos en empresas constructoras.", type: "risk" },
    { id: "timber-construction", title: "Construcción en Madera y Biosourcés", description: "Metros cuadrados construidos con materiales orgánicos (cáñamo, paja).", type: "index" },
    { id: "facility-management", title: "Mantenimiento de Edificios", description: "Mercado de contratos de facility management técnico.", type: "index" },
    { id: "construction-waste", title: "Gestión de Residuos de Obra", description: "Tasa de valorización de escombros (economía circular obligatoria).", type: "benchmark" },
    { id: "social-housing", title: "Licitaciones de Vivienda Social", description: "Proyectos lanzados por organismos HLM (Habitation à Loyer Modéré).", type: "index" },
    { id: "site-safety", title: "Siniestralidad en Obra", description: "Estadísticas de seguridad y salud laboral.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const bouwendNederland: PremiumPartner = {
  id: "bouwend-nederland",
  name: "Bouwend Nederland",
  fullName: "Bouwend Nederland",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Construcción e Infraestructura del Agua",
  
  authorityContext: {
    narrative: "Bouwend Nederland ('Holanda Construye') agrupa a las empresas que literalmente mantienen el país a flote. En Holanda, construcción significa también gestión del agua (diques, pólders) e infraestructuras complejas en suelo blando. Son líderes mundiales en dragado y construcción circular, obligados por la falta de espacio y recursos.",
    keyStats: [
      { value: "#1", label: "Dragado Mundial" },
      { value: "Delta", label: "Programa de Protección" },
      { value: "Circular", label: "Construcción Sostenible" }
    ],
    headquarters: "Zoetermeer, Países Bajos"
  },
  
  ecosystem: [
    { name: "Royal BAM Group", description: "Construcción e ingeniería" },
    { name: "VolkerWessels", description: "Infraestructuras y telecomunicaciones" },
    { name: "Boskalis", description: "Dragado y marítimo (líder mundial)" },
    { name: "Van Oord", description: "Dragado y eólica marina" },
    { name: "Heijmans", description: "Construcción de viviendas y carreteras" },
    { name: "TBI Holdings", description: "Tecnología y construcción" },
    { name: "Dura Vermeer", description: "Infraestructura y edificación" },
    { name: "Strukton", description: "Ferrocarriles y obras civiles" }
  ],
  
  dataAnalysis: {
    summary: "Datos únicos sobre infraestructura hidráulica, construcción prefabricada (para reducir emisiones de nitrógeno en obra) y dragado.",
    capabilities: [
      "Emisiones de nitrógeno en obra",
      "Protección contra inundaciones",
      "Viviendas prefabricadas",
      "Construcción circular"
    ],
    uniqueValue: "Acceso al ecosistema de construcción más innovador de Europa: datos de dragado, prefabricación, infraestructura hidráulica y urban mining."
  },
  
  useCases: [
    { id: "nitrogen-construction", title: "Emisiones de Nitrógeno en Obra", description: "Datos críticos para obtener permisos de construcción (crisis del nitrógeno en NL).", type: "benchmark" },
    { id: "flood-protection", title: "Proyectos de Protección contra Inundaciones", description: "Inversión en refuerzo de diques (Programa Delta).", type: "index" },
    { id: "prefab-housing", title: "Viviendas Prefabricadas", description: "Datos de producción de casas modulares en fábrica.", type: "capacity" },
    { id: "road-maintenance", title: "Mantenimiento de Carreteras", description: "Estado y renovación del asfalto poroso (ZOAB) típico de Holanda.", type: "benchmark" },
    { id: "cycling-infrastructure", title: "Infraestructura Ciclista", description: "Licitaciones para construcción de autopistas para bicicletas.", type: "index" },
    { id: "dredging-volumes", title: "Dragado y Movimiento de Tierras", description: "Volúmenes de arena movidos para ganar terreno al mar.", type: "index" },
    { id: "bim-standards", title: "Digitalización BIM", description: "Estándares abiertos de intercambio de datos de construcción.", type: "benchmark" },
    { id: "circular-construction", title: "Construcción Circular", description: "Bancos de materiales recuperados de demoliciones ('Urban Mining').", type: "index" },
    { id: "ev-charging-infra", title: "Infraestructura de Recarga EV", description: "Instalación de puntos de carga en obra nueva.", type: "index" },
    { id: "foundation-costs", title: "Costes de Cimentación", description: "Precios de pilotaje profundo (necesario en suelo holandés).", type: "cost" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 11: LICITACIONES Y RESURGIR PORTUGUÉS
// ============================================

export const itbid: PremiumPartner = {
  id: "itbid",
  name: "ITBID",
  fullName: "ITBID - El Cerebro Digital de Compras Empresariales",
  country: { code: "ES", flag: "🇪🇸", name: "España" },
  vertical: "Source-to-Pay & Gestión de Proveedores",
  
  authorityContext: {
    narrative: "ITBID es el 'cerebro digital' que utilizan las grandes y medianas empresas para gestionar todo lo que compran y su relación con quienes se lo venden. Es una plataforma en la nube que sustituye el caos de correos electrónicos, excels y llamadas por un sistema centralizado y eficiente. Gracias a su integración con PROCUREDATA y PONTUS-X, conecta a las compañías a una 'autopista digital europea' segura donde la información de los proveedores fluye de manera verificada, protegiendo a las empresas de fraudes y ayudándolas a cumplir con sus objetivos de sostenibilidad.",
    keyStats: [
      { value: "Source-to-Pay", label: "Ciclo Completo de Compras" },
      { value: "ESG Ready", label: "Homologación Sostenible" },
      { value: "GAIA-X", label: "Integrado con Pontus-X" }
    ],
    headquarters: "Madrid, España"
  },
  
  ecosystem: [
    { name: "PROCUREDATA", description: "Ecosistema de Datos Verificados" },
    { name: "PONTUS-X", description: "Infraestructura GAIA-X / Web3" },
    { name: "Navantia", description: "Construcción naval militar" },
    { name: "Generalitat de Catalunya", description: "Administración regional" },
    { name: "Acciona", description: "Infraestructuras sostenibles" },
    { name: "Correos", description: "Logística nacional" },
    { name: "Metro de Madrid", description: "Transporte público" },
    { name: "Aena", description: "Gestión aeroportuaria" }
  ],
  
  dataAnalysis: {
    summary: "Plataforma integral que cubre el ciclo completo de compras: desde el portal de proveedores hasta el control de calidad, pasando por homologación ESG y automatización de pedidos.",
    capabilities: [
      "Portal de Proveedores - Colaboración y documentos compartidos",
      "Homologación y Riesgos - Análisis legal, financiero y ESG",
      "Negociación y Pedidos - Automatización de RFx a factura",
      "Control de Calidad - Gestión de incidencias"
    ],
    uniqueValue: "El único sistema Source-to-Pay conectado a un Espacio de Datos Compartido europeo (PROCUREDATA + PONTUS-X), eliminando la burocracia de altas de proveedores mediante inteligencia colectiva verificada."
  },
  
  useCases: [
    { id: "supplier-portal", title: "Portal de Proveedores Federado", description: "Espacio de colaboración donde empresas y proveedores comparten documentos con total transparencia.", type: "directory" },
    { id: "supplier-qualification", title: "Homologación Automática", description: "Validación de proveedores usando datos verificados del ecosistema PROCUREDATA.", type: "risk" },
    { id: "esg-scoring", title: "Scoring ESG de Proveedores", description: "Análisis de sostenibilidad, responsabilidad social y gobierno corporativo.", type: "index" },
    { id: "financial-health", title: "Salud Financiera", description: "Evaluación de solvencia y riesgo de quiebra de proveedores.", type: "risk" },
    { id: "rfx-automation", title: "Automatización de RFx", description: "Desde la petición de ofertas hasta la adjudicación sin errores manuales.", type: "forecast" },
    { id: "contract-management", title: "Gestión de Contratos", description: "Ciclo de vida completo desde negociación hasta renovación.", type: "strategy" },
    { id: "invoice-matching", title: "Conciliación de Facturas", description: "Matching automático entre pedidos, recepciones y facturas.", type: "benchmark" },
    { id: "quality-incidents", title: "Gestión de Incidencias", description: "Seguimiento y resolución de problemas de calidad en entregas.", type: "risk" },
    { id: "spend-analytics", title: "Analítica de Gasto", description: "Dashboard de gasto por categoría, proveedor y período.", type: "benchmark" },
    { id: "data-sovereignty", title: "Soberanía del Dato", description: "Compartir información sin perder control mediante tecnología Pontus-X.", type: "strategy" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const fim: PremiumPartner = {
  id: "fim",
  name: "FIM",
  fullName: "Fédération des Industries Mécaniques",
  country: { code: "FR", flag: "🇫🇷", name: "Francia" },
  vertical: "Maquinaria y Equipamiento Mecánico",
  
  authorityContext: {
    narrative: "La Fédération des Industries Mécaniques (FIM) representa a la 'fábrica de Francia'. Agrupa a más de 10.000 empresas que diseñan, producen e instalan equipos mecánicos. Desde válvulas industriales hasta robótica y calderería pesada. Son los que equipan a las demás industrias (energía, agro, transporte). Lideran la iniciativa 'Industrie du Futur' en Francia.",
    keyStats: [
      { value: "10.000+", label: "Empresas Miembro" },
      { value: "€120Bn", label: "Facturación Sector" },
      { value: "#1", label: "Maquinaria Francia" }
    ],
    headquarters: "París, Francia"
  },
  
  ecosystem: [
    { name: "Manitou Group", description: "Maquinaria de manipulación" },
    { name: "Poclain Hydraulics", description: "Motores hidráulicos" },
    { name: "Fives", description: "Ingeniería industrial global" },
    { name: "Legrand", description: "Infraestructura eléctrica/mecánica" },
    { name: "Alstom", description: "Componentes mecánicos ferroviarios" },
    { name: "Kuhn", description: "Maquinaria agrícola" },
    { name: "Haulotte", description: "Plataformas elevadoras" },
    { name: "Cetim", description: "Centro Técnico de las Industrias Mecánicas" }
  ],
  
  dataAnalysis: {
    summary: "Datos de bienes de capital (Capex). Indicadores adelantados de inversión industrial: si la FIM vende máquinas hoy, la industria producirá mañana.",
    capabilities: [
      "Pedidos de maquinaria industrial",
      "Exportación de bienes de equipo",
      "Robótica colaborativa",
      "Digitalización de productos"
    ],
    uniqueValue: "Acceso a datos adelantados de inversión industrial: pedidos de maquinaria, bienes de equipo y adopción de Industrie du Futur."
  },
  
  useCases: [
    { id: "machinery-orders", title: "Pedidos de Maquinaria Industrial", description: "Índice de entrada de nuevos pedidos (barómetro económico).", type: "index" },
    { id: "steel-foundry-prices", title: "Precios de Acero y Fundición", description: "Coste de materias primas metálicas para manufactura.", type: "cost" },
    { id: "capital-goods-exports", title: "Exportación de Bienes de Equipo", description: "Flujos de venta de tecnología francesa a China y Alemania.", type: "index" },
    { id: "component-lead-times", title: "Plazos de Entrega de Componentes", description: "Tiempos de espera para rodamientos, válvulas y bombas.", type: "benchmark" },
    { id: "additive-manufacturing", title: "Adopción de Fabricación Aditiva", description: "Uso de impresión 3D metálica en piezas finales.", type: "index" },
    { id: "industrial-maintenance", title: "Mantenimiento Industrial", description: "Demanda de servicios de reparación y repuestos.", type: "index" },
    { id: "motor-efficiency", title: "Eficiencia Energética de Motores", description: "Datos de transición a motores eléctricos IE4/IE5.", type: "benchmark" },
    { id: "collaborative-robotics", title: "Robótica Colaborativa", description: "Ventas de cobots en PYMEs francesas.", type: "index" },
    { id: "mechanics-employment", title: "Empleo en Mecánica", description: "Escasez de torneros, fresadores y soldadores cualificados.", type: "capacity" },
    { id: "connected-machinery", title: "Digitalización de Productos", description: "Maquinaria conectada (IIoT) vendida.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const aicep: PremiumPartner = {
  id: "aicep",
  name: "AICEP",
  fullName: "Agência para o Investimento e Comércio Externo de Portugal",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Comercio Exterior e Inversión",
  
  authorityContext: {
    narrative: "La Agência para o Investimento e Comércio Externo de Portugal (AICEP) es el motor de la internacionalización lusa. Funciona como agencia gubernamental pero con mentalidad empresarial. Gestionan los parques industriales donde se instalan multinacionales (como la Autoeuropa de VW). Son la fuente oficial de datos sobre Inversión Extranjera Directa (IED) y capacidad exportadora de Portugal.",
    keyStats: [
      { value: "€10Bn+", label: "IED Anual Gestionada" },
      { value: "VW/Bosch", label: "Multinacionales Instaladas" },
      { value: "80+", label: "Mercados Cubiertos" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "Volkswagen Autoeuropa", description: "La mayor fábrica de coches de Portugal" },
    { name: "The Navigator Company", description: "Papel y celulosa (líder europeo)" },
    { name: "Galp", description: "Energía" },
    { name: "EDP", description: "Energía renovable" },
    { name: "Bosch Portugal", description: "Centros de I+D y producción" },
    { name: "Continental Mabor", description: "Neumáticos" },
    { name: "Ikea Industry", description: "Fábricas de muebles en Paços de Ferreira" },
    { name: "Farfetch", description: "Unicornio tecnológico - operaciones" }
  ],
  
  dataAnalysis: {
    summary: "Datos macroeconómicos de suelo industrial, incentivos fiscales y flujos comerciales. Vital para empresas que buscan deslocalizar producción a Portugal (nearshoring).",
    capabilities: [
      "Disponibilidad de suelo industrial",
      "Incentivos fiscales Portugal 2030",
      "Costes de implantación",
      "Nearshoring desde Asia"
    ],
    uniqueValue: "Acceso a datos oficiales de inversión extranjera, suelo industrial y capacidad exportadora de Portugal como destino de nearshoring."
  },
  
  useCases: [
    { id: "industrial-land", title: "Disponibilidad de Suelo Industrial", description: "Metros cuadrados libres en zonas francas y parques empresariales.", type: "capacity" },
    { id: "soft-landing-costs", title: "Costes de Implantación", description: "Benchmarks de gastos legales y administrativos para abrir filial.", type: "cost" },
    { id: "fiscal-incentives", title: "Mapa de Incentivos Fiscales", description: "Datos sobre beneficios para I+D e inversión productiva (Portugal 2030).", type: "directory" },
    { id: "sector-exports", title: "Exportaciones por Sector", description: "Volúmenes de venta de calzado, textil y metalmecánica.", type: "index" },
    { id: "fdi-origin", title: "Inversión Extranjera Directa", description: "Origen de capitales que invierten en Portugal.", type: "index" },
    { id: "port-logistics-costs", title: "Costes Logísticos Portuarios", description: "Tarifas de los puertos de Sines y Leixões.", type: "cost" },
    { id: "multilingual-talent", title: "Talento Multilingüe", description: "Disponibilidad de personal para centros de servicios compartidos.", type: "capacity" },
    { id: "nearshoring-trends", title: "Nearshoring", description: "Tendencias de relocalización de producción desde Asia.", type: "forecast" },
    { id: "origin-certifications", title: "Certificaciones de Origen", description: "Datos de productos con sello 'Made in Portugal'.", type: "directory" },
    { id: "rail-connectivity", title: "Conectividad Ferroviaria", description: "Capacidad de carga del Corredor Atlántico.", type: "capacity" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const ticePt: PremiumPartner = {
  id: "tice-pt",
  name: "TICE.PT",
  fullName: "Pólo de Competitividade das TIC e Electrónica",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Tecnología (TIC) y Software",
  
  authorityContext: {
    narrative: "TICE.PT es el polo de competitividad de las tecnologías de la información, comunicación y electrónica en Portugal. Portugal se ha convertido en el 'hub de codificación' de Europa, atrayendo centros tecnológicos de BMW, Mercedes o Google. TICE.PT coordina este ecosistema, conectando universidades, startups y corporaciones.",
    keyStats: [
      { value: "3", label: "Unicornios Tech (Feedzai, Talkdesk, OutSystems)" },
      { value: "€5Bn+", label: "Exportación TIC Anual" },
      { value: "BMW/Mercedes", label: "Tech Hubs Instalados" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "Critical TechWorks", description: "Joint venture BMW - desarrollo software coche" },
    { name: "OutSystems", description: "Unicornio Low-code" },
    { name: "Altice Portugal (MEO)", description: "Telecomunicaciones" },
    { name: "NOS", description: "Telecomunicaciones" },
    { name: "Feedzai", description: "IA para prevención de fraude (Unicornio)" },
    { name: "Talkdesk", description: "Contact center cloud (Unicornio)" },
    { name: "Siemens Portugal", description: "Tech hubs" },
    { name: "Fraunhofer Portugal", description: "Investigación en agricultura digital y salud" }
  ],
  
  dataAnalysis: {
    summary: "El nodo del talento digital. Datos sobre salarios de desarrolladores (muy competitivos en Europa), infraestructura 5G y startups.",
    capabilities: [
      "Salarios de desarrolladores",
      "Exportación de servicios TIC",
      "Ecosistema de startups",
      "Centros de excelencia extranjeros"
    ],
    uniqueValue: "Acceso al ecosistema tecnológico portugués: salarios competitivos de desarrolladores, unicornios y tech hubs de multinacionales."
  },
  
  useCases: [
    { id: "developer-salaries", title: "Salarios de Desarrolladores", description: "Remuneración media de ingenieros en Lisboa vs. Oporto vs. Braga.", type: "benchmark" },
    { id: "ict-exports", title: "Exportación de Servicios TIC", description: "Volumen de facturación de software portugués al extranjero.", type: "index" },
    { id: "5g-fiber-coverage", title: "Cobertura 5G y Fibra", description: "Mapas de conectividad de alta velocidad.", type: "capacity" },
    { id: "startup-ecosystem", title: "Ecosistema de Startups", description: "Censo de nuevas empresas tecnológicas por vertical.", type: "directory" },
    { id: "stem-graduates", title: "Graduados STEM", description: "Número anual de ingenieros saliendo de las universidades.", type: "capacity" },
    { id: "tech-office-costs", title: "Coste de Oficinas Tech", description: "Precios de alquiler en hubs digitales como Parque das Nações.", type: "cost" },
    { id: "cloud-adoption", title: "Adopción de Cloud", description: "% de empresas portuguesas migradas a la nube.", type: "index" },
    { id: "excellence-centers", title: "Centros de Excelencia", description: "Mapa de hubs de ingeniería extranjeros instalados en el país.", type: "directory" },
    { id: "smart-city-projects", title: "Proyectos de Smart City", description: "Datos de sensorización en ciudades portuguesas.", type: "index" },
    { id: "sme-digitalization", title: "Digitalización de PYMEs", description: "Índice de madurez digital del tejido empresarial tradicional.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const aip: PremiumPartner = {
  id: "aip",
  name: "AIP",
  fullName: "Associação Industrial Portuguesa",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Industria General y Ferias",
  
  authorityContext: {
    narrative: "La Associação Industrial Portuguesa (AIP) es la decana de las asociaciones empresariales (fundada en 1837). Con sede en Lisboa, organiza las grandes ferias industriales (FIL). Representa al tejido empresarial transversal de Portugal, no solo a un sector. Es el termómetro de la confianza empresarial y la salud de las PYMEs portuguesas.",
    keyStats: [
      { value: "1837", label: "Fundación" },
      { value: "FIL", label: "Ferias Lisboa" },
      { value: "Transversal", label: "Todos los Sectores" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "Delta Cafés", description: "Alimentación y distribución" },
    { name: "Sumol+Compal", description: "Bebidas" },
    { name: "Sovena", description: "Aceite de oliva y agricultura" },
    { name: "Grupo Barraqueiro", description: "Transporte" },
    { name: "Teixeira Duarte", description: "Construcción" },
    { name: "Grupo Visabeira", description: "Conglomerado industrial/servicios" },
    { name: "Renova", description: "Papel tisú (marca global)" },
    { name: "Vista Alegre", description: "Porcelana y cristal de lujo" }
  ],
  
  dataAnalysis: {
    summary: "Datos de sentimiento empresarial, insolvencias y ferias comerciales. Aportan la visión transversal de la economía lusa.",
    capabilities: [
      "Índice de confianza industrial",
      "Asistencia a ferias B2B",
      "Plazos de pago a proveedores",
      "Relevo generacional"
    ],
    uniqueValue: "Acceso a datos transversales de la economía portuguesa: confianza empresarial, ferias industriales, crédito a empresas y sucesión familiar."
  },
  
  useCases: [
    { id: "industrial-confidence", title: "Índice de Confianza Industrial", description: "Encuesta mensual de clima económico en Portugal.", type: "index" },
    { id: "fair-attendance", title: "Asistencia a Ferias", description: "Datos de visitantes profesionales en eventos B2B.", type: "index" },
    { id: "payment-terms", title: "Plazos de Pago a Proveedores", description: "Comportamiento de pagos de empresas portuguesas.", type: "benchmark" },
    { id: "company-creation", title: "Creación de Empresas", description: "Estadísticas de nuevas sociedades constituidas por región.", type: "index" },
    { id: "sme-internationalization", title: "Internacionalización de PYMEs", description: "% de pequeñas empresas que inician actividad exportadora.", type: "index" },
    { id: "industrial-energy", title: "Consumo de Energía Industrial", description: "Datos agregados de demanda eléctrica empresarial.", type: "benchmark" },
    { id: "business-credit", title: "Crédito a Empresas", description: "Condiciones de acceso a financiación bancaria.", type: "benchmark" },
    { id: "executive-training", title: "Formación Ejecutiva", description: "Demanda de cursos de gestión y liderazgo.", type: "index" },
    { id: "labor-productivity", title: "Productividad Laboral", description: "Métricas de valor añadido bruto por empleado.", type: "benchmark" },
    { id: "generational-handover", title: "Relevo Generacional", description: "Datos sobre sucesión en empresas familiares.", type: "forecast" }
  ],
  
  status: "active",
  tier: "strategic"
};

// ============================================
// PAQUETE 12: MOVILIDAD INTELIGENTE Y COMPRAS IBÉRICAS
// ============================================

export const raiVereniging: PremiumPartner = {
  id: "rai",
  name: "RAI Vereniging",
  fullName: "RAI Vereniging - Movilidad y Automoción",
  country: { code: "NL", flag: "🇳🇱", name: "Países Bajos" },
  vertical: "Movilidad, Automoción y Bicicleta",
  
  authorityContext: {
    narrative: "RAI Vereniging no es la típica asociación de fabricantes de coches. En los Países Bajos, la movilidad es un concepto holístico: coches, camiones, bicicletas eléctricas y scooters conviven. RAI representa a los importadores y fabricantes de remolques y carrocerías especiales. Son la referencia mundial en datos sobre electrificación de flotas, infraestructura de carga y la integración de la micromovilidad en la logística urbana.",
    keyStats: [
      { value: "#1", label: "Adopción EV Europa" },
      { value: "e-Bikes", label: "Líder Mundial" },
      { value: "MaaS", label: "Movilidad como Servicio" }
    ],
    headquarters: "Ámsterdam, Países Bajos"
  },
  
  ecosystem: [
    { name: "DAF Trucks", description: "Fabricante de camiones (PACCAR)" },
    { name: "Pon Holdings", description: "Importador masivo y dueño de Gazelle/Cervélo" },
    { name: "VDL Groep", description: "Autobuses y manufactura (VDL Nedcar)" },
    { name: "TomTom", description: "Tecnología de mapas y tráfico" },
    { name: "Fastned", description: "Red de carga rápida" },
    { name: "Accell Group", description: "Bicicletas (Batavus, Sparta)" },
    { name: "Louwman Group", description: "Distribución automotriz (Toyota NL)" },
    { name: "Alfen", description: "Estaciones de carga y almacenamiento" }
  ],
  
  dataAnalysis: {
    summary: "Datos únicos sobre movilidad ligera, logística de última milla y ventas de vehículos eléctricos (Holanda es líder en adopción).",
    capabilities: [
      "Venta de e-Bikes y cargo bikes",
      "Densidad de cargadores públicos",
      "Logística de última milla",
      "Fiscalidad automotriz verde"
    ],
    uniqueValue: "Acceso al mercado de movilidad más avanzado de Europa: datos de electrificación, micromovilidad, infraestructura de carga y zonas de bajas emisiones."
  },
  
  useCases: [
    { id: "ebike-sales", title: "Venta de Bicicletas Eléctricas (e-Bikes)", description: "Estadísticas de ventas por categoría (cargo bikes vs. urbanas).", type: "index" },
    { id: "charger-density", title: "Densidad de Cargadores Públicos", description: "Datos de disponibilidad de puntos de recarga por municipio.", type: "capacity" },
    { id: "commercial-ev", title: "Matriculación de Vehículos Comerciales", description: "Ventas de furgonetas eléctricas para reparto urbano.", type: "index" },
    { id: "trailer-logistics", title: "Logística de Remolques", description: "Datos de producción de tráilers y carrocerías especiales.", type: "capacity" },
    { id: "low-emission-zones", title: "Zonas de Bajas Emisiones (Milieuzones)", description: "Base de datos de restricciones de acceso en ciudades holandesas.", type: "directory" },
    { id: "ebike-battery-prices", title: "Precios de Baterías de Bicicleta", description: "Costes de reposición y reciclaje de baterías ligeras.", type: "cost" },
    { id: "vehicle-imports", title: "Importación de Vehículos", description: "Flujos de entrada de coches asiáticos a través de puertos holandeses.", type: "index" },
    { id: "maas-adoption", title: "Movilidad como Servicio (MaaS)", description: "Adopción de apps de transporte compartido.", type: "index" },
    { id: "automotive-taxation", title: "Fiscalidad Automotriz (BPM)", description: "Datos sobre impuestos de matriculación basados en CO2.", type: "benchmark" },
    { id: "cycling-safety", title: "Seguridad en Ciclovías", description: "Estadísticas de accidentes e infraestructura ciclista.", type: "risk" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const febiac: PremiumPartner = {
  id: "febiac",
  name: "FEBIAC",
  fullName: "Fédération Belge et Luxembourgeoise de l'Automobile",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Automoción y Motocicletas",
  
  authorityContext: {
    narrative: "La Fédération Belge et Luxembourgeoise de l'Automobile (FEBIAC) gestiona un mercado único: Bélgica tiene una densidad de 'coches de empresa' altísima debido a su fiscalidad. Además, es un hub de ensamblaje (Audi, Volvo) y logística. FEBIAC organiza el Salón del Automóvil de Bruselas. Sus datos son vitales para entender el mercado de flotas corporativas y la logística de importación europea.",
    keyStats: [
      { value: "#1", label: "Flotas de Empresa Europa" },
      { value: "Zeebrugge", label: "Mayor Puerto Auto Mundial" },
      { value: "Audi/Volvo", label: "Hubs de Producción" }
    ],
    headquarters: "Bruselas, Bélgica"
  },
  
  ecosystem: [
    { name: "Audi Brussels", description: "Fábrica clave para modelos e-tron" },
    { name: "Volvo Car Gent", description: "Una de las mayores fábricas de Volvo fuera de Suecia" },
    { name: "Toyota Motor Europe", description: "Sede central europea en Bruselas" },
    { name: "D'Ieteren", description: "Distribuidor masivo de grupo VW y servicios de movilidad" },
    { name: "Punch Powertrain", description: "Sistemas de transmisión" },
    { name: "Van Hool", description: "Autobuses (histórico)" },
    { name: "Honda Motor Europe Logistics", description: "Hub logístico en Gante" },
    { name: "Umicore", description: "Materiales para baterías (socio clave)" }
  ],
  
  dataAnalysis: {
    summary: "El nodo de las flotas de empresa (salary cars). Datos sobre electrificación corporativa, logística portuaria de vehículos (Zeebrugge) y fiscalidad verde.",
    capabilities: [
      "Matriculaciones de flotas corporativas",
      "Logística portuaria de vehículos",
      "Fiscalidad de beneficio en especie",
      "Electrificación de autobuses"
    ],
    uniqueValue: "Acceso al mercado de flotas corporativas más desarrollado de Europa: datos de 'salary cars', electrificación empresarial y logística portuaria."
  },
  
  useCases: [
    { id: "company-car-registrations", title: "Matriculaciones de Coches de Empresa", description: "Datos desagregados de flotas corporativas (mercado mayoritario en BE).", type: "index" },
    { id: "fleet-fuel-mix", title: "Mix de Combustible en Flotas", description: "Velocidad de transición del diésel al eléctrico en empresas.", type: "index" },
    { id: "zeebrugge-volumes", title: "Importación/Exportación de Vehículos (Zeebrugge)", description: "Volúmenes de coches movidos por el mayor puerto automotriz del mundo.", type: "index" },
    { id: "benefit-in-kind", title: "Fiscalidad de Beneficio en Especie (ATN)", description: "Datos de impacto fiscal en la elección de vehículo.", type: "benchmark" },
    { id: "motorcycle-sales", title: "Venta de Motocicletas y Scooters", description: "Tendencias de movilidad personal en ciudades congestionadas.", type: "index" },
    { id: "vehicle-recycling", title: "Desguace y Reciclaje (Febelauto)", description: "Tasa de recuperación de vehículos al final de su vida útil.", type: "benchmark" },
    { id: "bus-electrification", title: "Electrificación de Autobuses", description: "Compras de transporte público cero emisiones.", type: "index" },
    { id: "leasing-prices", title: "Precios de Leasing", description: "Cuotas mensuales medias para modelos populares de empresa.", type: "benchmark" },
    { id: "fleet-co2-emissions", title: "Emisiones Medias de CO2 (WLTP)", description: "Evolución de la huella de carbono del parque móvil nuevo.", type: "benchmark" },
    { id: "spare-parts-logistics", title: "Logística de Repuestos", description: "Tiempos de distribución de piezas desde hubs centrales belgas.", type: "benchmark" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const skywin: PremiumPartner = {
  id: "skywin",
  name: "Skywin",
  fullName: "Pôle de Compétitivité Aéronautique et Spatial de Wallonie",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Aeroespacial y Defensa",
  
  authorityContext: {
    narrative: "Skywin es el clúster aeroespacial de Valonia. Complementa a la perfección a los otros nodos aeroespaciales (Toulouse, Hamburgo, Sevilla). Su especialidad es la propulsión (partes de motor), los sistemas de accionamiento y los materiales compuestos. Es un clúster muy enfocado en I+D militar y civil, con una fuerte conexión con el programa Ariane (Espacio).",
    keyStats: [
      { value: "Ariane", label: "Programa Espacial" },
      { value: "Propulsión", label: "Especialidad Motor" },
      { value: "Safran/Sonaca", label: "Líderes Mundiales" }
    ],
    headquarters: "Charleroi, Bélgica"
  },
  
  ecosystem: [
    { name: "Safran Aero Boosters", description: "Compresores de baja presión para motores de avión" },
    { name: "Sonaca", description: "Líder mundial en bordes de ataque de alas (Slats)" },
    { name: "Sabca", description: "Actuadores y estructuras para espacio/aviación" },
    { name: "Thales Belgium", description: "Sistemas de defensa y cohetes" },
    { name: "FN Herstal", description: "Defensa y armamento (materiales asociados)" },
    { name: "Cenaero", description: "Simulación numérica y supercomputación" },
    { name: "Amos", description: "Sistemas ópticos para espacio" },
    { name: "GDTech", description: "Ingeniería y simulación" }
  ],
  
  dataAnalysis: {
    summary: "Datos de ingeniería de precisión, simulación aerodinámica y ensayos no destructivos.",
    capabilities: [
      "Mecanizado de titanio",
      "Ensayos espaciales",
      "Simulación CFD",
      "Fabricación aditiva certificada"
    ],
    uniqueValue: "Acceso al ecosistema de propulsión aeroespacial de Valonia: datos de mecanizado de titanio, ensayos espaciales y materiales compuestos termoplásticos."
  },
  
  useCases: [
    { id: "titanium-machining", title: "Capacidad de Mecanizado de Titanio", description: "Disponibilidad de centros de mecanizado para piezas críticas de motor.", type: "capacity" },
    { id: "space-component-testing", title: "Ensayos de Componentes Espaciales", description: "Datos de pruebas de vibración y vacío para satélites.", type: "capacity" },
    { id: "cfd-simulation", title: "Simulación de Fluidos (CFD)", description: "Capacidad de cálculo para aerodinámica digital.", type: "capacity" },
    { id: "actuator-production", title: "Producción de Actuadores", description: "Lead times para sistemas electromecánicos de control de vuelo.", type: "benchmark" },
    { id: "thermoplastic-composites", title: "Materiales Compuestos Termoplásticos", description: "Datos de nuevas resinas reciclables para aviación.", type: "index" },
    { id: "logistics-drones", title: "Drones para Logística", description: "Proyectos piloto de transporte autónomo aéreo.", type: "index" },
    { id: "military-engine-mro", title: "Mantenimiento de Motores Militares", description: "Datos de revisión de motores de F-16/F-35.", type: "capacity" },
    { id: "aero-engineering-cost", title: "Coste de Ingeniería Aeronáutica", description: "Tarifas hora de ingenieros de estrés y diseño en Bélgica.", type: "cost" },
    { id: "space-optics", title: "Óptica Espacial", description: "Capacidad de fabricación de espejos para telescopios y satélites.", type: "capacity" },
    { id: "metal-additive", title: "Fabricación Aditiva de Metal", description: "Certificación de piezas impresas en 3D para motores.", type: "index" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const flux50: PremiumPartner = {
  id: "flux50",
  name: "Flux50",
  fullName: "Flux50 - Smart Energy Cluster",
  country: { code: "BE", flag: "🇧🇪", name: "Bélgica" },
  vertical: "Energía Inteligente y Smart Grids",
  
  authorityContext: {
    narrative: "Flux50 es el clúster de innovación energética de Flandes. Bélgica es un nodo energético crucial debido a sus interconexiones y su costa del Mar del Norte (eólica marina). Flux50 se centra en hacer la red 'inteligente': micro-redes, barrios de energía positiva y la integración de renovables en la industria. Son el laboratorio de la descentralización energética.",
    keyStats: [
      { value: "Offshore", label: "Eólica Mar del Norte" },
      { value: "Elia", label: "TSO Interconectado" },
      { value: "EnergyVille", label: "Centro I+D Energía" }
    ],
    headquarters: "Gante, Bélgica"
  },
  
  ecosystem: [
    { name: "Fluvius", description: "Gestor de la red de distribución flamenca" },
    { name: "DEME Group", description: "Instalación de eólica marina" },
    { name: "Jan De Nul", description: "Infraestructura marítima y cables" },
    { name: "Engie Electrabel", description: "Generación" },
    { name: "Elia", description: "Operador del sistema de transmisión (TSO)" },
    { name: "Vito", description: "Instituto de investigación tecnológica" },
    { name: "EnergyVille", description: "Centro de investigación en ciudades sostenibles" },
    { name: "Smappee", description: "Monitores de energía inteligente" }
  ],
  
  dataAnalysis: {
    summary: "Datos punteros sobre eólica offshore, gestión de la demanda flexible y renovación energética de edificios.",
    capabilities: [
      "Producción eólica marina",
      "Flexibilidad de red industrial",
      "Micro-redes y comunidades energéticas",
      "Contadores digitales"
    ],
    uniqueValue: "Acceso al laboratorio de descentralización energética de Flandes: datos de eólica offshore, flexibilidad industrial, micro-redes y comunidades energéticas."
  },
  
  useCases: [
    { id: "offshore-wind-production", title: "Producción Eólica Marina", description: "Datos de generación real en los parques del Mar del Norte belga.", type: "index" },
    { id: "grid-flexibility", title: "Flexibilidad de la Red", description: "Potencial de desconexión de cargas industriales para equilibrar el sistema.", type: "capacity" },
    { id: "deep-renovation", title: "Renovación Profunda de Edificios", description: "Costes y ahorros de proyectos de aislamiento integral (Energiesprong).", type: "cost" },
    { id: "industrial-microgrids", title: "Micro-redes Industriales", description: "Datos de gestión autónoma de energía en polígonos empresariales.", type: "index" },
    { id: "district-heating", title: "Calefacción Urbana (Heat Networks)", description: "Recuperación de calor residual industrial para redes de distrito.", type: "index" },
    { id: "grid-scale-storage", title: "Almacenamiento a Gran Escala", description: "Capacidad instalada para regulación de frecuencia.", type: "capacity" },
    { id: "smart-meters", title: "Datos de Contadores Digitales", description: "Despliegue y granularidad de datos de consumo en Flandes.", type: "index" },
    { id: "energy-communities", title: "Comunidades Energéticas", description: "Estadísticas de barrios que comparten energía solar localmente.", type: "index" },
    { id: "hydrogen-integration", title: "Integración de Hidrógeno", description: "Proyectos de 'Power-to-Gas' en puertos flamencos.", type: "index" },
    { id: "pv-installation-prices", title: "Precios de Instalación Fotovoltaica", description: "Costes llave en mano para paneles solares residenciales.", type: "cost" }
  ],
  
  status: "active",
  tier: "strategic"
};

export const apcadec: PremiumPartner = {
  id: "apcadec",
  name: "APCADEC",
  fullName: "Associação Portuguesa de Compras e Aprovisionamento",
  country: { code: "PT", flag: "🇵🇹", name: "Portugal" },
  vertical: "Compras y Aprovisionamiento",
  
  authorityContext: {
    narrative: "La Associação Portuguesa de Compras e Aprovisionamento (APCADEC) completa el mapa ibérico de procurement. Es la asociación de referencia para los Directores de Compras en Portugal. En un mercado que actúa como puente entre Europa, Brasil y África, APCADEC aporta la visión de gestión de costes, digitalización y relación con proveedores en el mercado lusófono.",
    keyStats: [
      { value: "Lusófono", label: "Puente PT-BR-África" },
      { value: "PSI-20", label: "Grandes Compradores" },
      { value: "CPSM", label: "Certificación Profesional" }
    ],
    headquarters: "Lisboa, Portugal"
  },
  
  ecosystem: [
    { name: "EDP", description: "Energía (líder global en renovables)" },
    { name: "Galp", description: "Energía y movilidad" },
    { name: "TAP Air Portugal", description: "Aerolínea" },
    { name: "Jerónimo Martins", description: "Distribución/Retail (Pingo Doce)" },
    { name: "Sonae", description: "Conglomerado Retail/Telco/Inmobiliario" },
    { name: "NOS", description: "Telecomunicaciones" },
    { name: "The Navigator Company", description: "Papel" },
    { name: "Brisa", description: "Infraestructuras y autopistas" }
  ],
  
  dataAnalysis: {
    summary: "Datos de salarios de compras en Portugal (más competitivos que en el norte), plazos de pago y riesgo de proveedores en el eje atlántico.",
    capabilities: [
      "Salarios de compradores PT",
      "Riesgo de proveedores lusófonos",
      "Digitalización P2P",
      "Importaciones de Brasil/Angola"
    ],
    uniqueValue: "Acceso al ecosistema de compras portugués: datos de salarios competitivos, relaciones con mercados lusófonos y digitalización de procurement."
  },
  
  useCases: [
    { id: "buyer-salaries-pt", title: "Salarios de Compradores en Portugal", description: "Benchmarks de remuneración para roles de Category Manager en Lisboa/Oporto.", type: "benchmark" },
    { id: "supplier-market-risk", title: "Riesgo de Proveedores (Market Risk)", description: "Datos de estabilidad financiera de PYMEs portuguesas.", type: "risk" },
    { id: "p2p-digitalization", title: "Digitalización de Compras (P2P)", description: "Adopción de herramientas e-procurement en empresas del PSI-20.", type: "index" },
    { id: "fleet-costs-pt", title: "Costes de Flota Corporativa", description: "Precios de renting y gestión de combustible en Portugal.", type: "cost" },
    { id: "energy-prices-mibel", title: "Precios de Energía para Empresas", description: "Impacto del mercado eléctrico ibérico (MIBEL) en costes industriales.", type: "index" },
    { id: "dpo-payment-terms", title: "Plazos Medios de Pago", description: "Datos reales de DPO (Days Payable Outstanding) por sector.", type: "benchmark" },
    { id: "marketing-services", title: "Compras de Servicios de Marketing", description: "Tarifas de agencias y medios en el mercado luso.", type: "benchmark" },
    { id: "esg-supply-chain", title: "Sostenibilidad en Cadena de Suministro", description: "Madurez de criterios ESG en selección de proveedores.", type: "benchmark" },
    { id: "lusophone-imports", title: "Importaciones de Brasil/Angola", description: "Flujos de compras desde mercados lusófonos.", type: "index" },
    { id: "corporate-travel", title: "Gasto en Viajes Corporativos", description: "Tendencias de costes en hoteles y vuelos para empresas portuguesas.", type: "cost" }
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
  foodI,
  // Paquete 6: Cielos, Salud y Energía Limpia
  hamburgAviation,
  aeropolis,
  biowin,
  healthClusterPortugal,
  capenergies,
  // Paquete 7: Energía, Seguridad y Materiales
  bdew,
  federmeccanica,
  hagueSecurityDelta,
  habitatSustentavel,
  ufe,
  // Paquete 8: Moda Circular, Cerámica y Electrónica
  distrettoTessile,
  distrettoCeramica,
  produtech,
  secartys,
  dspValley,
  // Paquete 9: Biotecnología, Química y Nuevo Espacio
  biovalleyFrance,
  biorn,
  feique,
  essenscia,
  aedClusterPortugal,
  // Paquete 10: Tierra, Acero y Hormigón
  dbv,
  ltoNederland,
  wsm,
  ffb,
  bouwendNederland,
  // Paquete 11: Licitaciones y Resurgir Portugués
  itbid,
  fim,
  aicep,
  ticePt,
  aip,
  // Paquete 12: Movilidad Inteligente y Compras Ibéricas
  raiVereniging,
  febiac,
  skywin,
  flux50,
  apcadec
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
