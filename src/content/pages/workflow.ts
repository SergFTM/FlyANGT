/**
 * Workflow Page Content
 *
 * EN and RU versions of workflow page copy.
 */

import type { Locale } from '$config/i18n.config';

export interface WorkflowPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    title: string;
    text: string;
  };
  stepsIntro: {
    title: string;
    text: string;
  };
  stepDetail: {
    checklistTitle: string;
    docsTitle: string;
    backLabel: string;
  };
  dashboard: {
    title: string;
    text: string;
    openDashboardLabel: string;
  };
  disclaimer: string;
}

const workflowContentEn: WorkflowPageContent = {
  hero: {
    h1: 'From Order to Flight',
    h2: 'Your journey with FlyANGT, step by step',
    primaryCta: 'Start Configuring',
    secondaryCta: 'View Dashboard',
  },
  overview: {
    title: 'How It Works',
    text: 'Our structured workflow guides you through every stage of aircraft acquisition, from initial configuration to ongoing service. Each step is designed to ensure quality, transparency, and your complete satisfaction.',
  },
  stepsIntro: {
    title: 'Workflow Steps',
    text: 'Click on any step to learn more about what happens at each stage of your journey.',
  },
  stepDetail: {
    checklistTitle: 'Checklist',
    docsTitle: 'Required Documents',
    backLabel: 'Back to Overview',
  },
  dashboard: {
    title: 'Track Your Progress',
    text: 'Already started your journey? Access your dashboard to view the status of your requests and track progress in real time.',
    openDashboardLabel: 'Open Dashboard',
  },
  disclaimer:
    'Workflow timelines are estimates and may vary based on configuration, availability, and regulatory requirements. All steps are subject to terms and conditions outlined in the Trust Center.',
};

const workflowContentRu: WorkflowPageContent = {
  hero: {
    h1: 'От заказа до полета',
    h2: 'Ваш путь с FlyANGT, шаг за шагом',
    primaryCta: 'Начать настройку',
    secondaryCta: 'Открыть кабинет',
  },
  overview: {
    title: 'Как это работает',
    text: 'Наш структурированный процесс проведет вас через все этапы приобретения воздушного судна, от начальной конфигурации до постоянного обслуживания. Каждый шаг обеспечивает качество, прозрачность и ваше полное удовлетворение.',
  },
  stepsIntro: {
    title: 'Этапы процесса',
    text: 'Нажмите на любой этап, чтобы узнать подробнее о том, что происходит на каждой стадии.',
  },
  stepDetail: {
    checklistTitle: 'Чек-лист',
    docsTitle: 'Необходимые документы',
    backLabel: 'К обзору',
  },
  dashboard: {
    title: 'Отслеживайте прогресс',
    text: 'Уже начали свой путь? Откройте личный кабинет для просмотра статуса ваших заявок и отслеживания прогресса в реальном времени.',
    openDashboardLabel: 'Открыть кабинет',
  },
  disclaimer:
    'Сроки выполнения этапов являются ориентировочными и могут варьироваться в зависимости от конфигурации, наличия и нормативных требований. Все этапы регулируются условиями, изложенными в Центре доверия.',
};

const workflowContent: Record<Locale, WorkflowPageContent> = {
  en: workflowContentEn,
  ru: workflowContentRu,
};

/**
 * Get workflow page content by locale
 */
export function getWorkflowContent(locale: Locale): WorkflowPageContent {
  return workflowContent[locale] ?? workflowContent.en;
}
