-- 1. Tabla para almacenar las líneas de innovación
CREATE TABLE IF NOT EXISTS innovation_lab_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'ESG', 'Finance', 'Supply Chain', 'Legal', 'Product', 'Operations'
    short_description TEXT NOT NULL,
    full_analysis TEXT NOT NULL,
    business_impact TEXT NOT NULL, -- Ej: "Reducción de costes 15%"
    maturity_level INTEGER DEFAULT 1, -- 1 (Concepto) a 5 (Listo para mercado)
    
    -- Configuración dinámica para gráficos
    chart_type TEXT NOT NULL, -- 'bar', 'line', 'pie', 'area'
    chart_data JSONB NOT NULL, -- Datos sintéticos para el gráfico
    chart_config JSONB NOT NULL, -- Configuración de ejes y colores
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS: Lectura pública para la demo
ALTER TABLE innovation_lab_concepts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON innovation_lab_concepts FOR SELECT USING (true);

-- 3. Insertar las 20 líneas de innovación
INSERT INTO innovation_lab_concepts (title, category, short_description, full_analysis, business_impact, maturity_level, chart_type, chart_data, chart_config) VALUES

-- 1. FINANCIAL FACTORING
(
    'Dynamic Invoice Factoring', 'Finance', 
    'Financiación inmediata basada en la reputación de datos.',
    'Utiliza el histórico de transacciones validadas en ProcureData para asignar un score de riesgo dinámico. Permite a los bancos ofrecer factoring con tasas preferenciales automáticas.',
    'Reducción de tasas de interés del 4% al 1.5%', 5,
    'area', 
    '[{"month":"Ene","tasa_std":4.2,"tasa_dynamic":1.8},{"month":"Feb","tasa_std":4.1,"tasa_dynamic":1.6},{"month":"Mar","tasa_std":4.3,"tasa_dynamic":1.5},{"month":"Abr","tasa_std":4.2,"tasa_dynamic":1.4}]'::jsonb,
    '{"xKey":"month","series":[{"key":"tasa_std","color":"#94a3b8","name":"Tasa Tradicional"},{"key":"tasa_dynamic","color":"#10b981","name":"Tasa ProcureData"}]}'::jsonb
),

-- 2. ESG SCOPE 3
(
    'Scope 3 Carbon Tracker', 'ESG',
    'Cálculo automático de huella de carbono en cadena de suministro.',
    'Agregación automática de los JSONs de emisiones de proveedores (Tier 1, 2 y 3). Elimina la estimación manual y usa datos primarios auditados.',
    'Precisión del reporte ESG +85%', 5,
    'pie',
    '[{"name":"Logística","value":35},{"name":"Materias Primas","value":45},{"name":"Manufactura","value":15},{"name":"Residuos","value":5}]'::jsonb,
    '{"dataKey":"value","nameKey":"name","colors":["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}'::jsonb
),

-- 3. DIGITAL PRODUCT PASSPORT
(
    'Digital Product Passport (DPP)', 'Product',
    'Pasaporte digital para economía circular (Normativa UE).',
    'Generación automática del código QR que contiene la trazabilidad completa, composición de materiales y manuales de reciclaje obtenidos de los Data Holders.',
    'Cumplimiento Normativa UE 100%', 4,
    'bar',
    '[{"name":"Baterías","compliance":98},{"name":"Textil","compliance":85},{"name":"Electrónica","compliance":92},{"name":"Plásticos","compliance":75}]'::jsonb,
    '{"xKey":"name","series":[{"key":"compliance","color":"#8b5cf6","name":"% Cumplimiento DPP"}]}'::jsonb
),

-- 4. PREDICTIVE MAINTENANCE
(
    'MaaS: Maintenance as a Service', 'Supply Chain',
    'Venta de horas de uso en lugar de venta de activos.',
    'Los fabricantes de maquinaria acceden a telemetría en tiempo real (vibración, temperatura) para cobrar por uptime y prevenir fallos antes de que ocurran.',
    'Reducción de Downtime -40%', 3,
    'line',
    '[{"day":"L","temp":65,"vibration":12},{"day":"M","temp":68,"vibration":14},{"day":"X","temp":72,"vibration":45},{"day":"J","temp":62,"vibration":12},{"day":"V","temp":64,"vibration":11}]'::jsonb,
    '{"xKey":"day","series":[{"key":"vibration","color":"#ef4444","name":"Nivel Vibración (Alerta > 40)"}]}'::jsonb
),

-- 5. SUPPLIER RISK RADAR
(
    'Supplier Geo-Political Risk', 'Supply Chain',
    'Mapa de calor de riesgo en tiempo real.',
    'Cruza las direcciones fiscales de los proveedores en ProcureData con APIs de noticias globales y alertas meteorológicas para predecir roturas de stock.',
    'Tiempo de reacción ante crisis -3 días', 4,
    'bar',
    '[{"region":"APAC","risk":65},{"region":"EMEA","risk":30},{"region":"LATAM","risk":45},{"region":"NA","risk":20}]'::jsonb,
    '{"xKey":"region","series":[{"key":"risk","color":"#f97316","name":"Índice de Riesgo (0-100)"}]}'::jsonb
),

-- 6. CIRCULAR ECONOMY
(
    'Industrial Waste Exchange', 'ESG',
    'Marketplace de subproductos industriales.',
    'Lo que es residuo para el Proveedor A (ej. recortes de cuero) se oferta automáticamente como materia prima para el Consumidor B.',
    'Ingresos por residuos +20%', 2,
    'pie',
    '[{"name":"Reutilizado","value":40},{"name":"Reciclado","value":30},{"name":"Vertedero","value":30}]'::jsonb,
    '{"dataKey":"value","nameKey":"name","colors":["#10b981", "#3b82f6", "#64748b"]}'::jsonb
),

-- 7. COLLABORATIVE R&D
(
    'Collaborative R&D Cleanroom', 'Product',
    'Entorno seguro para compartir IP sin revelar secretos.',
    'Compute-to-Data: Los algoritmos viajan al dato para entrenar modelos de IA conjuntos sin que las empresas vean los datos crudos de la otra.',
    'Aceleración time-to-market 2x', 1,
    'line',
    '[{"sprint":"S1","model_acc":45},{"sprint":"S2","model_acc":60},{"sprint":"S3","model_acc":85},{"sprint":"S4","model_acc":92}]'::jsonb,
    '{"xKey":"sprint","series":[{"key":"model_acc","color":"#6366f1","name":"Precisión IA Colaborativa"}]}'::jsonb
),

-- 8. SMART CONTRACTS PAYMENTS
(
    'Auto-Execution Payments', 'Finance',
    'Pago automático contra entrega de datos.',
    'El Smart Contract libera el pago (USDC/Euro Digital) en el milisegundo en que el dato pasa la validación de esquema en ProcureData.',
    'Días de Ventas Pendientes (DSO) -> 0', 3,
    'bar',
    '[{"method":"Tradicional","days":45},{"method":"ProcureData Smart","days":0}]'::jsonb,
    '{"xKey":"method","series":[{"key":"days","color":"#0ea5e9","name":"Días para cobrar"}]}'::jsonb
),

-- 9. DIVERSITY AUDIT
(
    'Diversity & Inclusion Audit', 'Legal',
    'Certificación automática de proveedores diversos.',
    'Verificación de propiedad minoritaria o políticas de igualdad mediante acceso a registros mercantiles federados.',
    'Cumplimiento cuotas ESG 100%', 4,
    'pie',
    '[{"name":"Certificado","value":60},{"name":"En Proceso","value":25},{"name":"No Conforme","value":15}]'::jsonb,
    '{"dataKey":"value","nameKey":"name","colors":["#8b5cf6", "#f59e0b", "#94a3b8"]}'::jsonb
),

-- 10. ENERGY OPTIMIZATION
(
    'Energy Peak Shaving', 'Operations',
    'Coordinación de consumo energético industrial.',
    'Fábricas en el mismo polígono comparten datos de consumo en tiempo real para alternar picos de demanda y reducir la tarifa eléctrica conjunta.',
    'Ahorro factura eléctrica 18%', 2,
    'area',
    '[{"h":"10am","kw_indiv":500,"kw_shared":420},{"h":"12pm","kw_indiv":800,"kw_shared":650},{"h":"2pm","kw_indiv":750,"kw_shared":600}]'::jsonb,
    '{"xKey":"h","series":[{"key":"kw_indiv","color":"#ef4444","name":"Consumo Individual"},{"key":"kw_shared","color":"#10b981","name":"Consumo Optimizado"}]}'::jsonb
),

-- 11. CONFLICT MINERALS
(
    'Conflict Minerals Tracer', 'Legal',
    'Trazabilidad blockchain de 3TG (Tungsteno, Estaño, Tantalio, Oro).',
    'Rastreo desde la mina hasta el componente final mediante firmas criptográficas de cada actor en la cadena.',
    'Riesgo Legal 0%', 5,
    'bar',
    '[{"mineral":"Oro","verified":100},{"mineral":"Estaño","verified":95},{"mineral":"Cobalto","verified":88}]'::jsonb,
    '{"xKey":"mineral","series":[{"key":"verified","color":"#eab308","name":"% Origen Verificado"}]}'::jsonb
),

-- 12. LOGISTICS OPTIMIZATION
(
    'Shared Logistics Network', 'Supply Chain',
    'Llenado de camiones colaborativo.',
    'Proveedores con rutas similares comparten datos de capacidad ociosa en camiones para evitar viajes en vacío.',
    'Reducción Km en vacío 30%', 3,
    'bar',
    '[{"route":"Madrid-BCN","empty":40,"optimized":5},{"route":"Valencia-Mad","empty":35,"optimized":8}]'::jsonb,
    '{"xKey":"route","series":[{"key":"empty","color":"#94a3b8","name":"% Vacío Std"},{"key":"optimized","color":"#10b981","name":"% Vacío ProcureData"}]}'::jsonb
),

-- 13. INSURANCE TELEMATICS
(
    'Usage-Based Insurance (UBI)', 'Finance',
    'Primas de seguro dinámicas para carga.',
    'Las aseguradoras acceden a datos de sensores (golpes, temperatura) durante el transporte para ajustar la prima por viaje.',
    'Coste póliza -25%', 2,
    'line',
    '[{"trip":"Viaje 1","g_force":1.2,"premium":100},{"trip":"Viaje 2","g_force":4.5,"premium":150},{"trip":"Viaje 3","g_force":1.1,"premium":95}]'::jsonb,
    '{"xKey":"trip","series":[{"key":"premium","color":"#f43f5e","name":"Coste Seguro (€)"}]}'::jsonb
),

-- 14. COMPONENT OBSOLESCENCE
(
    'Obsolescence Predictor', 'Supply Chain',
    'Alerta temprana de fin de vida útil de componentes.',
    'Los fabricantes de chips publican datos de ciclo de vida que alertan automáticamente a los BOMs (Bill of Materials) de los clientes.',
    'Reducción costes rediseño 50%', 4,
    'bar',
    '[{"comp":"Chip A","risk":90},{"comp":"Sensor B","risk":20},{"comp":"Display C","risk":60}]'::jsonb,
    '{"xKey":"comp","series":[{"key":"risk","color":"#ef4444","name":"% Riesgo Obsolescencia"}]}'::jsonb
),

-- 15. CUSTOMS CLEARANCE
(
    'Green Lane Customs', 'Legal',
    'Despacho de aduanas instantáneo.',
    'Las autoridades aduaneras acceden al Data Space para pre-validar mercancías antes de que el barco llegue a puerto.',
    'Tiempo en puerto -48h', 3,
    'bar',
    '[{"step":"Documentación","hrs_old":24,"hrs_new":1},{"step":"Inspección","hrs_old":12,"hrs_new":4},{"step":"Liberación","hrs_old":6,"hrs_new":0.5}]'::jsonb,
    '{"xKey":"step","series":[{"key":"hrs_old","color":"#94a3b8","name":"Horas Std"},{"key":"hrs_new","color":"#3b82f6","name":"Horas FastTrack"}]}'::jsonb
),

-- 16. SKILLS PASSPORT
(
    'Worker Skills Passport', 'Operations',
    'Certificación verificada de cualificaciones operarios.',
    'Para obras o plantas peligrosas, verificar automáticamente que los subcontratistas tienen los cursos de seguridad vigentes.',
    'Accidentes laborales -15%', 4,
    'pie',
    '[{"name":"Vigente","value":85},{"name":"Caducado","value":10},{"name":"Sin Dato","value":5}]'::jsonb,
    '{"dataKey":"value","nameKey":"name","colors":["#10b981", "#ef4444", "#cbd5e1"]}'::jsonb
),

-- 17. DEMAND FORECASTING
(
    'Collaborative Forecasting', 'Supply Chain',
    'Sincronización de demanda Retail-Fabricante.',
    'El retailer comparte datos de punto de venta (POS) en tiempo real para que el fabricante ajuste la producción, reduciendo el Efecto Látigo.',
    'Stock de seguridad -25%', 3,
    'line',
    '[{"week":"W1","forecast_err":20},{"week":"W2","forecast_err":15},{"week":"W3","forecast_err":8},{"week":"W4","forecast_err":4}]'::jsonb,
    '{"xKey":"week","series":[{"key":"forecast_err","color":"#8b5cf6","name":"% Error Pronóstico"}]}'::jsonb
),

-- 18. RAW MATERIAL HEDGING
(
    'Material Price Hedging', 'Finance',
    'Cobertura de precios basada en inventario agregado.',
    'Análisis de niveles de inventario global anónimos para predecir fluctuaciones de precios en commodities (cobre, litio).',
    'Margen bruto +3%', 2,
    'line',
    '[{"q":"Q1","savings":1.2},{"q":"Q2","savings":2.5},{"q":"Q3","savings":3.1},{"q":"Q4","savings":2.8}]'::jsonb,
    '{"xKey":"q","series":[{"key":"savings","color":"#10b981","name":"Millones $ Ahorrados"}]}'::jsonb
),

-- 19. COUNTERFEIT DETECTION
(
    'Anti-Counterfeit Network', 'Product',
    'Validación de autenticidad mediante gemelo digital.',
    'Cada pieza de repuesto tiene un hash único. Al escanearlo, se verifica contra el registro del fabricante original en ProcureData.',
    'Piezas falsas detectadas 100%', 5,
    'bar',
    '[{"year":"2023","detected":150},{"year":"2024","detected":420}]'::jsonb,
    '{"xKey":"year","series":[{"key":"detected","color":"#f43f5e","name":"Falsificaciones Bloqueadas"}]}'::jsonb
),

-- 20. DISASTER RECOVERY
(
    'Supply Chain Resilience', 'Supply Chain',
    'Redireccionamiento automático ante catástrofes.',
    'Si un proveedor falla por desastre natural, el sistema identifica proveedores alternativos homologados con capacidad disponible en el Data Space.',
    'Tiempo recuperación 24h', 3,
    'bar',
    '[{"scenario":"Terremoto","manual_days":14,"auto_days":2},{"scenario":"Huelga","manual_days":7,"auto_days":1}]'::jsonb,
    '{"xKey":"scenario","series":[{"key":"manual_days","color":"#94a3b8","name":"Días Manual"},{"key":"auto_days","color":"#3b82f6","name":"Días ProcureData"}]}'::jsonb
);