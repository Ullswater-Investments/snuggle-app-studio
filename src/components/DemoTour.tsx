import { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const DemoTour = () => {
  const { isDemo } = useOrganizationContext();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Verificar si es la primera vez que el usuario demo inicia sesión
  useEffect(() => {
    if (isDemo && user?.email === 'demo@procuredata.app') {
      const hasSeenTour = localStorage.getItem('demo-tour-completed');
      
      // Solo mostrar el tour si estamos en el dashboard y no se ha visto antes
      if (!hasSeenTour && location.pathname === '/dashboard') {
        // Pequeño delay para que los elementos se rendericen
        const timer = setTimeout(() => {
          setRun(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isDemo, user, location.pathname]);

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">¡Bienvenido a PROCUREDATA Demo! 🎭</h2>
          <p>
            Este tour te guiará por las funcionalidades principales del sistema.
            Tienes acceso a <strong>6 organizaciones</strong> en diferentes roles para explorar
            el flujo completo de gobernanza de datos.
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-100">💡 Datos Demo Incluidos:</p>
            <ul className="mt-2 space-y-1 text-amber-800 dark:text-amber-200">
              <li>• 5 transacciones en diferentes estados</li>
              <li>• 4 proveedores con datos completos</li>
              <li>• Flujo de aprobación multi-actor configurado</li>
            </ul>
          </div>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="org-switcher"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Selector de Organización</h3>
          <p>
            Aquí puedes cambiar entre las <strong>6 organizaciones demo</strong> 
            para experimentar con diferentes roles:
          </p>
          <ul className="space-y-1 text-sm mt-2">
            <li>🏢 <strong>Consumer</strong>: Solicita datos (NovaTech, Fabricaciones)</li>
            <li>🔒 <strong>Holder</strong>: Aprueba solicitudes (ACME, Logística)</li>
            <li>📋 <strong>Provider</strong>: Pre-aprueba datos (Tornillería, Soluciones Químicas)</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Cambia de organización sin necesidad de hacer logout.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="requests-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Solicitudes Pendientes</h3>
          <p>
            En esta sección verás las transacciones que requieren tu atención según 
            tu rol actual.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg text-sm mt-2">
            <p className="font-semibold text-blue-900 dark:text-blue-100">🎯 Transacciones Demo:</p>
            <ul className="mt-2 space-y-1 text-blue-800 dark:text-blue-200">
              <li>• <span className="font-mono text-xs bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">pending_subject</span>: Esperando pre-aprobación del proveedor</li>
              <li>• <span className="font-mono text-xs bg-orange-100 dark:bg-orange-900/30 px-1 rounded">pending_holder</span>: Esperando aprobación final del poseedor</li>
            </ul>
          </div>
          <p className="text-sm font-medium mt-2">
            Haz clic aquí para ver tus solicitudes pendientes.
          </p>
        </div>
      ),
      placement: 'bottom',
      spotlightClicks: true,
    },
    {
      target: '[data-tour="data-view-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Visualización de Datos ✅</h3>
          <p>
            Aquí puedes consultar los datos de proveedores de <strong>transacciones completadas</strong>.
          </p>
          <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg text-sm mt-2">
            <p className="font-semibold text-green-900 dark:text-green-100">✨ Datos Disponibles:</p>
            <ul className="mt-2 space-y-1 text-green-800 dark:text-green-200">
              <li>• <strong>Biocen S.A.</strong> - Transacción completada</li>
              <li>• Información fiscal y de contacto</li>
              <li>• Exportación a CSV disponible</li>
              <li>• Integración con ERP configurada</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Cambia a "Energías Renovables del Este" para ver datos completados.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="catalog-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Catálogo de Datos</h3>
          <p>
            Explora los activos de datos disponibles de diferentes proveedores y 
            crea nuevas solicitudes.
          </p>
          <ul className="space-y-1 text-sm mt-2">
            <li>📊 Ver productos y activos disponibles</li>
            <li>🔍 Buscar por categorías y tags</li>
            <li>📝 Iniciar nuevas solicitudes de datos</li>
          </ul>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">🎉 ¡Listo para comenzar!</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Escenarios Recomendados:</h3>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100">📋 Escenario 1: Aprobar como Subject</p>
              <ol className="mt-2 space-y-1 text-blue-800 dark:text-blue-200 list-decimal list-inside">
                <li>Cambia a "Tornillería TÉCNICA S.A."</li>
                <li>Ve a Solicitudes → Pre-aprobar transacción pendiente</li>
                <li>Cambia a "ACME Industrial" → Aprobar final</li>
              </ol>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-sm">
              <p className="font-semibold text-green-900 dark:text-green-100">✅ Escenario 2: Ver Datos Completados</p>
              <ol className="mt-2 space-y-1 text-green-800 dark:text-green-200 list-decimal list-inside">
                <li>Cambia a "Energías Renovables del Este"</li>
                <li>Ve a Visualización de Datos</li>
                <li>Exporta los datos de Biocen S.A.</li>
              </ol>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Puedes ver esta guía nuevamente en cualquier momento desde el menú de ayuda.
          </p>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;

    // Navegar a la página de solicitudes cuando se hace clic en ese paso
    if (type === 'step:after' && index === 2 && action === 'next') {
      navigate('/requests');
    }

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Marcar el tour como completado
      localStorage.setItem('demo-tour-completed', 'true');
      setRun(false);
      setStepIndex(0);
    } else if (type === 'step:after') {
      setStepIndex(index + (action === 'prev' ? -1 : 1));
    }
  };

  if (!isDemo || !run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 8,
          padding: 20,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          borderRadius: 6,
          padding: '8px 16px',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          marginRight: 8,
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
        },
      }}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar tour',
      }}
    />
  );
};
