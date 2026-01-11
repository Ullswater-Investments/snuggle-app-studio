import { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const DemoTour = () => {
  const { isDemo } = useOrganizationContext();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('demo-tour');
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (isDemo && user?.email === 'demo@procuredata.app') {
      const hasSeenTour = localStorage.getItem('demo-tour-completed');
      
      if (!hasSeenTour && location.pathname === '/dashboard') {
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
          <h2 className="text-xl font-bold text-primary">
            {t('welcome.title')} 🎭
          </h2>
          <p dangerouslySetInnerHTML={{ __html: t('welcome.description') }} />
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm border border-amber-200 dark:border-amber-800">
            <p className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
              {t('welcome.syntheticData.title')}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 mb-2">
              {t('welcome.syntheticData.description')}
            </p>
            <ul className="mt-2 space-y-1 text-amber-800 dark:text-amber-200 text-sm">
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t('welcome.syntheticData.items.transactions')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t('welcome.syntheticData.items.suppliers')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t('welcome.syntheticData.items.approvals')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t('welcome.syntheticData.items.organizations')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t('welcome.syntheticData.items.flow')}` }} />
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('welcome.productionNote')}
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.demo-banner',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('demoBanner.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('demoBanner.description') }} />
          <p className="text-sm text-muted-foreground">{t('demoBanner.note')}</p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-sidebar="nav"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('navigation.title')}</h3>
          <p>{t('navigation.description')}</p>
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.dashboard') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.catalog') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.requests') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.data') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.reports') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.notifications') }} />
            <li dangerouslySetInnerHTML={{ __html: t('navigation.items.settings') }} />
          </ul>
          <p className="text-sm text-muted-foreground mt-2">{t('navigation.collapseTip')}</p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-tour="org-switcher"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('orgSwitcher.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('orgSwitcher.description') }} />
          <div className="space-y-2 text-sm mt-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
              <p className="font-semibold text-blue-900 dark:text-blue-100">{t('orgSwitcher.consumers.title')}</p>
              <p className="text-blue-800 dark:text-blue-200 text-xs">{t('orgSwitcher.consumers.examples')}</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded">
              <p className="font-semibold text-purple-900 dark:text-purple-100">{t('orgSwitcher.holders.title')}</p>
              <p className="text-purple-800 dark:text-purple-200 text-xs">{t('orgSwitcher.holders.examples')}</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded">
              <p className="font-semibold text-green-900 dark:text-green-100">{t('orgSwitcher.providers.title')}</p>
              <p className="text-green-800 dark:text-green-200 text-xs">{t('orgSwitcher.providers.examples')}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{t('orgSwitcher.switchTip')}</p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="dashboard-stats"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('dashboardStats.title')}</h3>
          <p>{t('dashboardStats.description')}</p>
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('dashboardStats.items.products') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dashboardStats.items.pending') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dashboardStats.items.completed') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dashboardStats.items.organizations') }} />
          </ul>
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">{t('dashboardStats.demoNote')}</p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="activity-feed"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('activityFeed.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('activityFeed.description') }} />
          <ul className="space-y-1 text-sm mt-2">
            <li>{t('activityFeed.items.approvals')}</li>
            <li>{t('activityFeed.items.denials')}</li>
            <li>{t('activityFeed.items.notes')}</li>
            <li>{t('activityFeed.items.timestamps')}</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">{t('activityFeed.demoNote')}</p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="catalog-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('catalogLink.title')}</h3>
          <p>{t('catalogLink.description')}</p>
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('catalogLink.items.search') }} />
            <li dangerouslySetInnerHTML={{ __html: t('catalogLink.items.products') }} />
            <li dangerouslySetInnerHTML={{ __html: t('catalogLink.items.holder') }} />
            <li dangerouslySetInnerHTML={{ __html: t('catalogLink.items.request') }} />
          </ul>
          <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded text-xs mt-2">
            <p className="text-green-800 dark:text-green-200">{t('catalogLink.demoNote')}</p>
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="requests-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('requestsLink.title')}</h3>
          <p>{t('requestsLink.description')}</p>
          <div className="space-y-2 text-sm mt-2">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded">
              <p className="font-semibold text-yellow-900 dark:text-yellow-100">{t('requestsLink.pending.title')}</p>
              <p className="text-yellow-800 dark:text-yellow-200 text-xs">{t('requestsLink.pending.description')}</p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
              <p className="font-semibold text-blue-900 dark:text-blue-100">{t('requestsLink.myRequests.title')}</p>
              <p className="text-blue-800 dark:text-blue-200 text-xs">{t('requestsLink.myRequests.description')}</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-950/30 rounded">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{t('requestsLink.allTransactions.title')}</p>
              <p className="text-gray-800 dark:text-gray-200 text-xs">{t('requestsLink.allTransactions.description')}</p>
            </div>
          </div>
          <p className="text-sm font-medium mt-2">{t('requestsLink.clickTip')}</p>
        </div>
      ),
      placement: 'bottom',
      spotlightClicks: true,
    },
    {
      target: '[data-tour="data-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('dataLink.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('dataLink.description') }} />
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('dataLink.items.completed') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dataLink.items.suppliers') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dataLink.items.export') }} />
            <li dangerouslySetInnerHTML={{ __html: t('dataLink.items.erp') }} />
          </ul>
          <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded text-xs mt-2">
            <p className="text-purple-800 dark:text-purple-200">{t('dataLink.demoNote')}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{t('dataLink.switchTip')}</p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="reports-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('reportsLink.title')}</h3>
          <p>{t('reportsLink.description')}</p>
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('reportsLink.items.pie') }} />
            <li dangerouslySetInnerHTML={{ __html: t('reportsLink.items.bar') }} />
            <li dangerouslySetInnerHTML={{ __html: t('reportsLink.items.metrics') }} />
          </ul>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-2 rounded text-xs mt-2">
            <p className="text-indigo-800 dark:text-indigo-200">{t('reportsLink.demoNote')}</p>
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="notifications-link"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{t('notificationsLink.title')}</h3>
          <p>{t('notificationsLink.description')}</p>
          <ul className="space-y-1 text-sm mt-2">
            <li dangerouslySetInnerHTML={{ __html: t('notificationsLink.items.notifications') }} />
            <li dangerouslySetInnerHTML={{ __html: t('notificationsLink.items.notes') }} />
            <li dangerouslySetInnerHTML={{ __html: t('notificationsLink.items.timestamps') }} />
            <li dangerouslySetInnerHTML={{ __html: t('notificationsLink.items.filters') }} />
          </ul>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded text-xs mt-2">
            <p className="text-blue-800 dark:text-blue-200">{t('notificationsLink.demoNote')}</p>
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">{t('finale.title')}</h2>
          
          <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2 text-sm">
              {t('finale.reminder.title')}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              {t('finale.reminder.description')}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{t('finale.scenarios.title')}</h3>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-900 dark:text-blue-100">{t('finale.scenarios.approval.title')}</p>
              <ol className="mt-2 space-y-1 text-blue-800 dark:text-blue-200 list-decimal list-inside text-xs">
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.approval.steps.1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.approval.steps.2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.approval.steps.3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.approval.steps.4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.approval.steps.5') }} />
              </ol>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-sm border border-purple-200 dark:border-purple-800">
              <p className="font-semibold text-purple-900 dark:text-purple-100">{t('finale.scenarios.data.title')}</p>
              <ol className="mt-2 space-y-1 text-purple-800 dark:text-purple-200 list-decimal list-inside text-xs">
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.data.steps.1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.data.steps.2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.data.steps.3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.data.steps.4') }} />
              </ol>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-sm border border-green-200 dark:border-green-800">
              <p className="font-semibold text-green-900 dark:text-green-100">{t('finale.scenarios.analytics.title')}</p>
              <ol className="mt-2 space-y-1 text-green-800 dark:text-green-200 list-decimal list-inside text-xs">
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.analytics.steps.1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.analytics.steps.2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.analytics.steps.3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.analytics.steps.4') }} />
              </ol>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-sm border border-indigo-200 dark:border-indigo-800">
              <p className="font-semibold text-indigo-900 dark:text-indigo-100">{t('finale.scenarios.roles.title')}</p>
              <ol className="mt-2 space-y-1 text-indigo-800 dark:text-indigo-200 list-decimal list-inside text-xs">
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.roles.steps.1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.roles.steps.2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.roles.steps.3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('finale.scenarios.roles.steps.4') }} />
              </ol>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center pt-2 border-t">
            {t('finale.restartTip')}
          </p>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;

    if (type === 'step:after' && index === 2 && action === 'next') {
      navigate('/requests');
    }

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
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
        back: t('buttons.back'),
        close: t('buttons.close'),
        last: t('buttons.last'),
        next: t('buttons.next'),
        skip: t('buttons.skip'),
      }}
    />
  );
};
