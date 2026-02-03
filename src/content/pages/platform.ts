/**
 * Platform Page Content
 *
 * EN/RU localized content for the platform page.
 */

import type { PageContent, LocalizedContent } from '../types';

export const platformContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'FlyANGT Platform',
      h2: 'Your Digital Cabinet for Aviation Management',
      trustLine: 'Documents, workflows, coordination in one place.',
      primaryCta: 'Request Access',
      secondaryCta: 'View Features',
    },
    sections: [
      {
        id: 'personal-cabinet',
        title: 'Personal Cabinet',
        text: 'A secure space for managing your aircraft projects, documents, and participation records.',
        bullets: [
          'Project overview and status',
          'Document storage and sharing',
          'Participation history',
          'Communication log',
        ],
      },
      {
        id: 'document-management',
        title: 'Document Management',
        text: 'Store, organize, and share aviation documents securely. Always know where your paperwork is.',
        bullets: [
          'Secure cloud storage',
          'Version control',
          'Sharing with service providers',
          'Expiration alerts',
        ],
      },
      {
        id: 'workflow-tools',
        title: 'Workflow Tools',
        text: 'Track service requests, approvals, and project milestones from start to completion.',
        bullets: [
          'Service request tracking',
          'Approval workflows',
          'Milestone notifications',
          'Task assignments',
        ],
      },
      {
        id: 'integrations',
        title: 'Platform Integrations',
        text: 'Connected with hub services, payment systems, and compliance tools for seamless operations.',
        bullets: [
          'Hub service scheduling',
          'Payment processing',
          'Compliance reporting',
          'Third party APIs',
        ],
      },
    ],
    finalCta: {
      title: 'Ready to Manage Your Aviation Projects?',
      text: 'Join FlyANGT and bring structure to your aircraft ownership experience.',
      button: 'Request Access',
    },
  },
  ru: {
    hero: {
      h1: 'Платформа FlyANGT',
      h2: 'Ваш цифровой кабинет для управления авиацией',
      trustLine: 'Документы, рабочие процессы, координация в одном месте.',
      primaryCta: 'Запросить доступ',
      secondaryCta: 'Смотреть возможности',
    },
    sections: [
      {
        id: 'personal-cabinet',
        title: 'Личный кабинет',
        text: 'Защищённое пространство для управления авиапроектами, документами и записями участия.',
        bullets: [
          'Обзор проектов и статус',
          'Хранение и обмен документами',
          'История участия',
          'Журнал коммуникаций',
        ],
      },
      {
        id: 'document-management',
        title: 'Управление документами',
        text: 'Храните, организуйте и делитесь авиационными документами безопасно. Всегда знайте, где ваши бумаги.',
        bullets: [
          'Безопасное облачное хранение',
          'Контроль версий',
          'Обмен с сервис провайдерами',
          'Уведомления об истечении сроков',
        ],
      },
      {
        id: 'workflow-tools',
        title: 'Инструменты рабочих процессов',
        text: 'Отслеживайте сервисные запросы, согласования и вехи проекта от начала до завершения.',
        bullets: [
          'Отслеживание сервисных запросов',
          'Процессы согласования',
          'Уведомления о вехах',
          'Назначение задач',
        ],
      },
      {
        id: 'integrations',
        title: 'Интеграции платформы',
        text: 'Связаны с услугами хаба, платёжными системами и инструментами соответствия.',
        bullets: [
          'Планирование услуг хаба',
          'Обработка платежей',
          'Отчётность о соответствии',
          'API третьих сторон',
        ],
      },
    ],
    finalCta: {
      title: 'Готовы управлять авиапроектами?',
      text: 'Присоединяйтесь к FlyANGT и привнесите структуру в опыт владения ВС.',
      button: 'Запросить доступ',
    },
  },
};
