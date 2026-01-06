-- Insert demo notifications for the demo user with varied types and timestamps
-- Valid types: info, success, warning, error
INSERT INTO public.notifications (user_id, type, title, message, link, is_read, created_at)
VALUES
  -- HOY (recent timestamps)
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning', 
   'Solicitud de Acceso a Datos',
   'La empresa EcoLogistics S.A. solicita acceso al dataset Emisiones CO2 2024. Requiere tu aprobación.',
   '/requests', false, NOW() - INTERVAL '15 minutes'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'success',
   'Pago Recibido (Web3)',
   'Has recibido 2,500 EUROe en tu wallet 0x4a...9f por la venta de datos de sostenibilidad.',
   '/data', false, NOW() - INTERVAL '2 hours'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning',
   'Nueva Propuesta de Compra',
   'Retail Giant Corp ha enviado una propuesta de 1,200€ por acceso a tus datos de afluencia.',
   '/requests', false, NOW() - INTERVAL '4 hours'),

  -- AYER
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'info',
   'Smart Contract Ejecutado',
   'El acuerdo de intercambio con Retail King ha sido notarizado en la red Pontus-X. Hash: 0x8b2...f4a',
   '/data', false, NOW() - INTERVAL '1 day' - INTERVAL '2 hours'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'info',
   'Nuevo Servicio Disponible',
   'Ya puedes usar la calculadora de huella de carbono integrada con tus datos ESG.',
   '/services', true, NOW() - INTERVAL '1 day' - INTERVAL '5 hours'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning',
   'Datos Próximos a Expirar',
   'El acceso a "Indicadores Financieros PYME" expira en 7 días. Renueva tu suscripción.',
   '/data', false, NOW() - INTERVAL '1 day' - INTERVAL '8 hours'),

  -- ANTERIORES (older)
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'success',
   'Transacción Completada',
   'La compra del dataset "Consumo Energético Industrial" se ha procesado correctamente.',
   '/data', true, NOW() - INTERVAL '3 days'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'info',
   'Mantenimiento Programado',
   'La plataforma tendrá una breve interrupción el próximo domingo a las 03:00 AM UTC.',
   NULL, true, NOW() - INTERVAL '5 days'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning',
   'Revisión de Contrato Pendiente',
   'Tienes un borrador de contrato con GreenMetrics AI pendiente de revisar y firmar.',
   '/requests', true, NOW() - INTERVAL '7 days'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'info',
   'Bienvenido a PROCUREDATA',
   'Tu cuenta ha sido verificada. Explora el marketplace y empieza a intercambiar datos.',
   '/catalog', true, NOW() - INTERVAL '14 days'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'success',
   'Verificación KYB Completada',
   'Tu organización PROCUREDATA Core ha sido verificada exitosamente.',
   '/settings/organization', true, NOW() - INTERVAL '15 days'),
  
  ('216d632b-9b4c-4de5-9205-06d3d42001e5', 'error',
   'Error de Sincronización ERP',
   'Falló la sincronización automática con SAP. Verifica la configuración de tu conexión.',
   '/settings/erp', true, NOW() - INTERVAL '16 days');