-- =============================================
-- PHASE 7-8: Demo Notifications (Fixed types)
-- Allowed types: warning, info, error, success
-- =============================================

INSERT INTO notifications (id, user_id, type, title, message, link, is_read, created_at) VALUES
('aa000001-0001-0001-0001-000000000001', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'success', 'Pago recibido', 'Retail Giant Corp ha completado el pago de 2,500 EUROe por acceso a Ficha Tecnica Proveedor Certificada', '/requests', false, NOW() - INTERVAL '2 hours'),
('aa000001-0001-0001-0001-000000000002', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning', 'Solicitud pendiente de aprobacion', 'Green Finance Bank solicita acceso a tu Scoring Crediticio. Revisa y aprueba la solicitud.', '/requests', false, NOW() - INTERVAL '6 hours'),
('aa000001-0001-0001-0001-000000000003', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'info', 'Nuevo reporte ESG Q1 2026 disponible', 'Tu reporte de sostenibilidad ha sido actualizado con datos de Scope 1, 2 y 3.', '/sustainability', false, NOW() - INTERVAL '1 day'),
('aa000001-0001-0001-0001-000000000004', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'info', 'Actualizacion de ficha de proveedor', 'Logistics AI Solutions ha actualizado su Ficha Tecnica y Certificaciones ISO.', '/catalog', false, NOW() - INTERVAL '2 days'),
('aa000001-0001-0001-0001-000000000005', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'warning', 'Licencia proxima a expirar', 'Tu acceso a datos de AgriData Consulting expira en 7 dias. Renueva para mantener el acceso.', '/requests', false, NOW() - INTERVAL '3 days'),
('aa000001-0001-0001-0001-000000000006', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'success', 'Homologacion completada', 'Has completado la homologacion de EcoTech Industrial como proveedor certificado.', '/requests', true, NOW() - INTERVAL '5 days'),
('aa000001-0001-0001-0001-000000000007', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'success', 'Recarga de wallet exitosa', 'Se han anadido 5,000 EUROe a tu wallet. Balance actual: 45,000 EUROe.', '/dashboard', true, NOW() - INTERVAL '1 week'),
('aa000001-0001-0001-0001-000000000008', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'info', 'Nueva solicitud de Trade Finance', 'Green Finance Bank ha solicitado acceso a tu historial de pagos para evaluacion crediticia.', '/requests', true, NOW() - INTERVAL '10 days'),
('aa000001-0001-0001-0001-000000000009', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'success', 'DID verificado en Pontus-X', 'Tu identidad descentralizada ha sido verificada exitosamente en la red Gaia-X.', '/settings', true, NOW() - INTERVAL '2 weeks'),
('aa000001-0001-0001-0001-000000000010', '216d632b-9b4c-4de5-9205-06d3d42001e5', 'info', 'Mejora en scoring de proveedor', 'Tu puntuacion como proveedor ha subido a 4.8/5.0 basado en 28 transacciones completadas.', '/dashboard', true, NOW() - INTERVAL '3 weeks')
ON CONFLICT (id) DO NOTHING;