-- 1. Crear tabla de Casos de Éxito
CREATE TABLE IF NOT EXISTS success_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    sector TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    impact_highlight TEXT NOT NULL,
    metrics JSONB NOT NULL,
    quote TEXT,
    author_role TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar lectura pública
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON success_stories FOR SELECT USING (true);

-- 2. Insertar 25 Casos de Éxito Hiper-Realistas
INSERT INTO success_stories (company_name, sector, challenge, solution, impact_highlight, metrics, quote, author_role, is_featured) VALUES

-- AUTOMOCIÓN
('VoltEdge Motors', 'Automoción', 'Trazabilidad de baterías para normativa UE.', 'Pasaporte digital de baterías federado con proveedores de litio.', 'Compliance UE 100%', '{"ahorro": "1.2M€/año", "riesgo": "-90%"}', 'Sin ProcureData, necesitaríamos 15 auditores manuales.', 'CTO', true),
('GearShift Logistics', 'Automoción', 'Paradas de línea por falta de chips.', 'Alertas predictivas de stock basadas en inventario de proveedores Tier-2.', 'Reducción paradas 85%', '{"uptime": "+14%", "coste": "-450k€"}', 'Vemos el problema 3 semanas antes que la competencia.', 'Supply Chain Dir.', false),
('AutoSafe Components', 'Automoción', 'Falsificación de repuestos en post-venta.', 'Validación de autenticidad mediante hash criptográfico en Data Space.', 'Falsificaciones 0%', '{"ingresos": "+5%", "marca": "+20 pts"}', 'Hemos recuperado la confianza del mercado asiático.', 'CEO', false),

-- ENERGÍA
('SolarGrid Coop', 'Energía', 'Desperdicio de energía renovable en picos.', 'Intercambio de datos de generación P2P para balanceo local.', 'Eficiencia Red +18%', '{"co2": "-500 tons", "ahorro": "15%"}', 'Nuestros paneles ahora son un 20% más rentables.', 'Presidente Coop', true),
('WindVestments', 'Energía', 'Auditoría lenta (DD) para comprar parques eólicos.', 'Data Room automatizado con histórico de mantenimiento verificado.', 'Due Diligence en 48h', '{"tiempo": "-30 días", "coste_legal": "-60%"}', 'Cerramos la compra meses antes gracias a los datos.', 'Investment Mgr', false),
('HydroFlow Utilities', 'Energía', 'Mantenimiento reactivo de turbinas.', 'Algoritmos de terceros sobre nuestros datos (Compute-to-Data).', 'Vida útil +3 años', '{"roi": "450%", "capex": "-2M€"}', 'Extendimos la vida de activos críticos sin compartir IP.', 'Ops Director', false),

-- PHARMA & SALUD
('BioCure Labs', 'Salud', 'Retrasos en ensayos clínicos multicéntricos.', 'Federación de datos de pacientes anonimizados entre hospitales.', 'Time-to-Market -6 meses', '{"valor": "50M€", "pacientes": "+2000"}', 'Aceleramos la cura manteniendo la privacidad total.', 'Head of R&D', true),
('MediCold Logistics', 'Salud', 'Pérdida de vacunas por rotura de frío.', 'IoT compartido en tiempo real entre transportistas.', 'Mermas reducidas al 0.5%', '{"ahorro": "300k€", "calidad": "100%"}', 'Monitorizamos la temperatura a través de 4 empresas distintas.', 'Logistics Mgr', false),

-- RETAIL & GRAN CONSUMO
('FreshMarket Group', 'Retail', 'Exceso de stock perecedero.', 'Previsión de demanda colaborativa con agricultores.', 'Desperdicio alimentario -40%', '{"margen": "+2.5%", "esg": "+AA"}', 'Nuestros frescos duran más porque llegan antes.', 'Sustainability Lead', true),
('FashionChain', 'Retail', 'Certificación de algodón orgánico.', 'Trazabilidad desde la granja hasta la tienda.', 'Ventas colección eco +200%', '{"transparencia": "100%", "ventas": "2.1M€"}', 'El cliente escanea el QR y ve la granja de origen.', 'Marketing VP', false),
('LogiPack Solutions', 'Retail', 'Devoluciones e-commerce fraudulentas.', 'Lista negra federada de patrones de fraude.', 'Fraude reducido un 90%', '{"ahorro": "1.5M€", "falsos_pos": "<1%"}', 'Detectamos estafadores profesionales al instante.', 'Risk Analyst', false),

-- CONSTRUCCIÓN E INFRAESTRUCTURAS
('BuildSmart Corp', 'Construcción', 'Accidentes por subcontratas no certificadas.', 'Validación automática de PRL en control de accesos.', 'Accidentes graves 0', '{"seguridad": "+100%", "multas": "0€"}', 'Ya no hay riesgos laborales críticos en obra.', 'HSQE Director', false),
('ConcreteMix Tech', 'Construcción', 'Variabilidad calidad hormigón.', 'Datos de sensores de fraguado compartidos en tiempo real.', 'Resistencia garantizada', '{"desperdicio": "-12%", "calidad": "+A1"}', 'Ya no demovemos estructuras por fallos de calidad.', 'Jefe de Obra', false),
('InfraRoads S.A.', 'Infraestructuras', 'Mantenimiento preventivo de puentes.', 'Fusión de datos de sensores propios y satelitales.', 'Vida útil +15 años', '{"ahorro_mantenimiento": "3M€", "seguridad": "100%"}', 'Detectamos micro-fisuras antes de que sean visibles.', 'Director Técnico', true),

-- FINANZAS Y SEGUROS
('SME Credit Bank', 'Finanzas', 'Evaluación de riesgo en PYMES sin historial.', 'Scoring basado en reputación de pagos en el Data Space.', 'Créditos aprobados +40%', '{"tasa_morosidad": "-2%", "volumen": "50M€"}', 'Damos crédito a empresas invisibles para el buró tradicional.', 'Risk Manager', true),
('CargoInsure', 'Seguros', 'Reclamaciones de seguros de carga complejas.', 'Smart Contract que paga automáticamente si los sensores IoT detectan daño.', 'Pago en <24h', '{"fraude": "-95%", "admin_cost": "-80%"}', 'El cliente cobra antes de que el barco llegue a puerto.', 'Head of Innovation', false),
('FactoringFast', 'Finanzas', 'Facturas impagadas en cadena de suministro.', 'Tokenización de facturas validadas por el cliente final.', 'Liquidez Inmediata', '{"dso": "2 días", "interes": "1.5%"}', 'Convertimos facturas en efectivo con un clic.', 'CEO', false),

-- AEROESPACIAL Y DEFENSA
('AeroParts Certified', 'Aeroespacial', 'Trazabilidad de piezas críticas de motor.', 'Historial de mantenimiento inmutable compartido entre aerolíneas.', 'Seguridad Aérea Total', '{"valor_activo": "+10%", "auditoria": "-500h"}', 'Sabemos quién tocó cada tornillo en los últimos 10 años.', 'MRO Director', true),
('SatComms Defense', 'Defensa', 'Intercambio seguro de inteligencia.', 'Espacio de datos soberano con encriptación homomórfica.', 'Soberanía del Dato', '{"velocidad": "Real-time", "fugas": "0"}', 'Compartimos amenazas sin revelar nuestras fuentes.', 'CISO', false),

-- AGRIFOOD
('Vinos de Origen', 'AgriFood', 'Falsificación de Denominación de Origen.', 'Certificado digital de parcela y uva en blockchain.', 'Precio botella +30%', '{"exportacion": "+20%", "confianza": "100%"}', 'El consumidor en China escanea y ve el viñedo.', 'Presidente DO', false),
('GrainFutures Co', 'AgriFood', 'Volatilidad precio del trigo.', 'Cobertura basada en datos agregados de cosecha en tiempo real.', 'Margen asegurado', '{"riesgo": "-40%", "beneficio": "+5%"}', 'Ya no especulamos, operamos con datos reales.', 'Trader', false),

-- LOGÍSTICA
('PortAuthority Hub', 'Logística', 'Cuellos de botella en aduanas.', 'Ventanilla única de datos para navieras y aduanas.', 'Estancia en puerto -30%', '{"ahorro_barco": "50k€/día", "co2": "-15%"}', 'Los contenedores no paran, fluyen.', 'Director Puerto', true),
('TruckShare Network', 'Logística', 'Camiones retornando vacíos.', 'Marketplace de capacidad ociosa entre competidores.', 'Km en vacío -45%', '{"beneficio_extra": "4k€/camión", "fuel": "-20%"}', 'Convertimos aire en dinero.', 'Fleet Manager', false),

-- TECNOLOGÍA Y TELCO
('CloudCompute Fed', 'Tecnología', 'Soberanía de datos en la nube.', 'Procesamiento federado cumpliendo Gaia-X.', 'Compliance GDPR', '{"coste_nube": "-15%", "privacidad": "Total"}', 'Nuestros datos nunca salen de Europa.', 'CIO', false),
('5G Industrial', 'Telco', 'Gestión de redes privadas 5G.', 'Slicing dinámico basado en demanda de datos IoT.', 'Latencia <5ms', '{"eficiencia": "+25%", "uptime": "99.999%"}', 'La red se adapta a la fábrica, no al revés.', 'Network Architect', false);