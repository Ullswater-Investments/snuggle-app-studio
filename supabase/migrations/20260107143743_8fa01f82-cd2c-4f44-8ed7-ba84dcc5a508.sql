-- =============================================================================
-- CASOS DE ÉXITO ESTRATÉGICOS - PROCUREDATA 2026
-- 5 historias de éxito vinculadas con las oportunidades de mercado
-- =============================================================================

INSERT INTO success_stories 
(company_name, sector, challenge, solution, impact_highlight, quote, author_role, metrics, is_featured)
VALUES
-- CASO 1: Industrial - Onboarding Relámpago
(
  'GigaFactory North',
  'Industrial',
  'El proceso de alta de proveedores tardaba 22 días de media debido a validaciones manuales de certificaciones ISO e IATF 16949.',
  'Implementación del servicio Homologación Flash 24h con pasaportes digitales verificados en la red Pontus-X y firma automática de contratos ODRL.',
  '-85% Tiempo de Alta',
  'Pasamos de 22 días a 48 horas. El equipo de compras ahora se dedica a negociar, no a perseguir papeles.',
  'Director de Compras, GigaFactory North',
  '{"tiempo_reducido": "22d → 48h", "proveedores_onboarded": "127", "ahorro_anual": "45.000 EUROe"}',
  true
),
-- CASO 2: Agroalimentario - Transparencia Verde
(
  'OliveTrust Coop',
  'Agroalimentario',
  'Necesidad de demostrar la huella hídrica real para cumplir con el pliego de condiciones del mercado alemán de exportación.',
  'Captura de datos IoT de consumo de riego y notarización de certificados de origen en blockchain con trazabilidad desde finca hasta distribuidor.',
  '+22% Valor de Exportación',
  'La trazabilidad verificable nos abrió las puertas de cadenas de supermercados premium en Alemania que antes nos rechazaban.',
  'Gerente Comercial, OliveTrust Coop',
  '{"premium_precio": "+12%", "nuevos_clientes": "8", "certificaciones_verificadas": "340"}',
  true
),
-- CASO 3: Movilidad Sostenible - Cumplimiento CSRD
(
  'UrbanDeliver S.L.',
  'Movilidad Sostenible',
  'Dificultad para auditar las emisiones reales Scope 3 de la flota logística para obtener financiación verde del banco.',
  'Integración del conector ERP Universal para extraer telemetría de consumo real y generar automáticamente el informe CSRD con datos verificados.',
  'Auditoría ESG en 1h',
  'Green Finance Bank aprobó nuestra línea de crédito verde en tiempo récord. El reporting que antes tardaba semanas ahora sale en una hora.',
  'CFO, UrbanDeliver S.L.',
  '{"horas_ahorradas": "2.500/año", "credito_obtenido": "500.000 EUROe", "emisiones_scope3": "-18%"}',
  true
),
-- CASO 4: Tech/Industrial - Mantenimiento Predictivo con IA
(
  'EcoTech Industrial',
  'Industrial',
  'Las paradas no planificadas de brazos robóticos CNC generaban pérdidas de 15.000 EUROe por hora de inactividad.',
  'Adquisición de datasets sintéticos de telemetría de fallos a través del marketplace para entrenar modelos de IA de mantenimiento predictivo.',
  '-15% Paradas de Línea',
  'Los datos que compramos en ProcureData nos permitieron anticipar fallos que antes nos pillaban por sorpresa. El ROI fue inmediato.',
  'Director de Operaciones, EcoTech Industrial',
  '{"paradas_evitadas": "23", "ahorro_estimado": "180.000 EUROe", "modelo_precision": "94%"}',
  true
),
-- CASO 5: Economía Social - Inclusión a Escala
(
  'Alianza Social Hub',
  'Economía Social',
  'Imposibilidad de demostrar el impacto social real (SROI) a las administraciones públicas para acceder a contratos de Compra Pública Ética.',
  'Registro de métricas de empleabilidad de colectivos vulnerables con certificación de impacto verificada en blockchain.',
  '99% Transparencia Ética',
  'Ahora podemos demostrar que cada euro invertido genera 3,2€ de retorno social. Las administraciones confían en nosotros.',
  'Directora de Impacto, Alianza Social Hub',
  '{"sroi_ratio": "3.2x", "contratos_publicos": "12", "empleos_creados": "47"}',
  false
);