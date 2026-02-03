/**
 * Ecosystem Page Content
 *
 * EN/RU localized content for the ecosystem page.
 */

import type { PageContent, LocalizedContent } from '../types';

export const ecosystemContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'FlyANGT Ecosystem',
      h2: 'Three Pillars of Aviation Coordination',
      trustLine: 'Hub services, digital platform, tokenization layer.',
      primaryCta: 'Explore Services',
      secondaryCta: 'View Platform',
    },
    sections: [
      {
        id: 'hub-services',
        title: 'Aviation Hub Services',
        text: 'Physical infrastructure for aircraft assembly, maintenance, and pilot training at certified facilities.',
        bullets: [
          'Aircraft assembly and customization',
          'Scheduled and unscheduled maintenance',
          'Pilot and technician training programs',
          'Parts supply and logistics',
        ],
      },
      {
        id: 'digital-platform',
        title: 'Digital Platform',
        text: 'Your personal cabinet for managing documents, tracking status, and coordinating with service providers.',
        bullets: [
          'Document management and storage',
          'Project status tracking',
          'Communication with service teams',
          'Payment and billing history',
        ],
      },
      {
        id: 'tokenization-layer',
        title: 'Tokenization Layer',
        text: 'Digital tokens for coordination, transparency, and participation tracking. Not speculation, just structure.',
        bullets: [
          'Participation tracking via tokens',
          'Transparent project coordination',
          'Verifiable ownership records',
          'Audit trail for compliance',
        ],
      },
      {
        id: 'integrations',
        title: 'Ecosystem Integrations',
        text: 'Connected with manufacturers, service providers, and compliance authorities for seamless operations.',
      },
    ],
    finalCta: {
      title: 'Join the Ecosystem',
      text: 'Whether you are an owner, partner, or service provider, FlyANGT connects all participants.',
      button: 'Get Started',
    },
  },
  ru: {
    hero: {
      h1: 'Экосистема FlyANGT',
      h2: 'Три столпа авиационной координации',
      trustLine: 'Услуги хаба, цифровая платформа, токенизационный слой.',
      primaryCta: 'Изучить услуги',
      secondaryCta: 'Смотреть платформу',
    },
    sections: [
      {
        id: 'hub-services',
        title: 'Услуги авиационного хаба',
        text: 'Физическая инфраструктура для сборки, обслуживания ВС и обучения пилотов на сертифицированных объектах.',
        bullets: [
          'Сборка и кастомизация воздушных судов',
          'Плановое и внеплановое обслуживание',
          'Программы обучения пилотов и техников',
          'Поставка запчастей и логистика',
        ],
      },
      {
        id: 'digital-platform',
        title: 'Цифровая платформа',
        text: 'Ваш личный кабинет для управления документами, отслеживания статуса и координации с провайдерами.',
        bullets: [
          'Управление и хранение документов',
          'Отслеживание статуса проектов',
          'Связь с сервисными командами',
          'История платежей и счетов',
        ],
      },
      {
        id: 'tokenization-layer',
        title: 'Токенизационный слой',
        text: 'Цифровые токены для координации, прозрачности и отслеживания участия. Не спекуляция, а структура.',
        bullets: [
          'Отслеживание участия через токены',
          'Прозрачная координация проектов',
          'Верифицируемые записи владения',
          'Аудиторский след для соответствия',
        ],
      },
      {
        id: 'integrations',
        title: 'Интеграции экосистемы',
        text: 'Связаны с производителями, сервис провайдерами и органами соответствия для бесшовных операций.',
      },
    ],
    finalCta: {
      title: 'Присоединяйтесь к экосистеме',
      text: 'Будь вы владелец, партнёр или поставщик услуг, FlyANGT объединяет всех участников.',
      button: 'Начать',
    },
  },
};
