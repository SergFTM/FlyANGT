/**
 * Home Page Content
 *
 * EN/RU localized content for the home orchestration hub.
 * No long dashes in copy. Clear neutral tone.
 */

import type { Locale } from '$config/i18n.config';

/**
 * Path item structure
 */
export interface HomePathItem {
  title: string;
  text: string;
  href: string;
}

/**
 * Quick action item
 */
export interface HomeQuickItem {
  title: string;
  text: string;
  href: string;
}

/**
 * Update item (static placeholder)
 */
export interface HomeUpdateItem {
  title: string;
  text: string;
  date: string;
  href: string;
}

/**
 * Home page content structure
 */
export interface HomePageContent {
  hero: {
    h1: string;
    h2: string;
    trustLine?: string;
    primaryCta: string;
    secondaryCta: string;
    microText?: string;
  };
  paths: {
    title: string;
    text: string;
    items: HomePathItem[];
  };
  modules: {
    title: string;
    text: string;
    cardLabel: string;
  };
  trust: {
    title: string;
    text: string;
    button: string;
  };
  workflow: {
    title: string;
    text: string;
    button: string;
  };
  quick: {
    title: string;
    text: string;
    items: HomeQuickItem[];
  };
  updates: {
    title: string;
    text: string;
    items: HomeUpdateItem[];
  };
  finalCta: {
    title: string;
    text: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
  disclaimer: string;
}

const homePageContentEn: HomePageContent = {
  hero: {
    h1: 'FlyANGT Aviation Ecosystem',
    h2: 'Structured Ownership, Service, and Coordination',
    trustLine: 'From kit assembly to flight. Transparent processes, certified partners, digital documentation.',
    primaryCta: 'For Customers',
    secondaryCta: 'For Investors',
    microText: 'Powered by Fintechme',
  },
  paths: {
    title: 'Choose Your Path',
    text: 'FlyANGT serves different participants in the aviation ecosystem. Select your role to see relevant information.',
    items: [
      {
        title: 'Aircraft Owners',
        text: 'Build, own, and operate your aircraft with structured guidance and certified support.',
        href: '/customers',
      },
      {
        title: 'Investors',
        text: 'Explore investment opportunities in aviation infrastructure and tokenized coordination.',
        href: '/investors',
      },
      {
        title: 'Partners',
        text: 'Join our network of MRO facilities, training centers, and service providers.',
        href: '/partners',
      },
    ],
  },
  modules: {
    title: 'Platform Modules',
    text: 'Explore the FlyANGT ecosystem through dedicated sections for each area of the platform.',
    cardLabel: 'Explore',
  },
  trust: {
    title: 'Trust Center',
    text: 'Access compliance documents, policies, audit information, and operational forms. Built for transparency and accountability.',
    button: 'Visit Trust Center',
  },
  workflow: {
    title: 'Order to Flight Process',
    text: 'Understand the complete journey from aircraft configuration to airworthiness certification and delivery.',
    button: 'View Workflow',
  },
  quick: {
    title: 'Quick Actions',
    text: 'Jump directly to key areas of the platform.',
    items: [
      {
        title: 'Presale',
        text: 'Current aircraft presale opportunities and pricing.',
        href: '/presale',
      },
      {
        title: 'Configurator',
        text: 'Design and customize your aircraft configuration.',
        href: '/configurator',
      },
      {
        title: 'Token Framework',
        text: 'Learn about ANGT token and coordination layer.',
        href: '/token',
      },
      {
        title: 'Dashboard',
        text: 'Access your personal cabinet and documents.',
        href: '/dashboard',
      },
    ],
  },
  updates: {
    title: 'Latest Updates',
    text: 'Recent announcements and platform developments.',
    items: [
      {
        title: 'Platform Launch',
        text: 'FlyANGT platform is now live with core modules available.',
        date: '2025-01',
        href: '/ecosystem',
      },
      {
        title: 'Trust Center Available',
        text: 'Access compliance documents and policies in the new Trust Center.',
        date: '2025-01',
        href: '/trust',
      },
      {
        title: 'Partner Network Open',
        text: 'MRO and training partners can now apply for certification.',
        date: '2025-01',
        href: '/partners',
      },
      {
        title: 'Configurator Beta',
        text: 'Aircraft configuration tool available for preview.',
        date: '2025-01',
        href: '/configurator',
      },
    ],
  },
  finalCta: {
    title: 'Ready to Get Started?',
    text: 'Join the FlyANGT ecosystem. Whether you are an owner, investor, or partner, we have a path for you.',
    buttonPrimary: 'Create Account',
    buttonSecondary: 'Contact Us',
  },
  disclaimer:
    'Information provided is for general purposes only. Aircraft specifications, pricing, and timelines are subject to change. Investment involves risk. All decisions should be made with appropriate professional advice.',
};

const homePageContentRu: HomePageContent = {
  hero: {
    h1: 'Авиационная экосистема FlyANGT',
    h2: 'Структурированное владение, сервис и координация',
    trustLine: 'От сборки кита до полета. Прозрачные процессы, сертифицированные партнеры, цифровая документация.',
    primaryCta: 'Для клиентов',
    secondaryCta: 'Для инвесторов',
    microText: 'При поддержке Fintechme',
  },
  paths: {
    title: 'Выберите свой путь',
    text: 'FlyANGT обслуживает разных участников авиационной экосистемы. Выберите свою роль для получения релевантной информации.',
    items: [
      {
        title: 'Владельцы ВС',
        text: 'Собирайте, владейте и эксплуатируйте самолет со структурированным сопровождением и сертифицированной поддержкой.',
        href: '/customers',
      },
      {
        title: 'Инвесторы',
        text: 'Изучите инвестиционные возможности в авиационную инфраструктуру и токенизированную координацию.',
        href: '/investors',
      },
      {
        title: 'Партнеры',
        text: 'Присоединяйтесь к нашей сети MRO, учебных центров и сервис-провайдеров.',
        href: '/partners',
      },
    ],
  },
  modules: {
    title: 'Модули платформы',
    text: 'Изучите экосистему FlyANGT через специализированные разделы для каждой области платформы.',
    cardLabel: 'Изучить',
  },
  trust: {
    title: 'Центр доверия',
    text: 'Доступ к документам соответствия, политикам, аудиторской информации и операционным формам. Создан для прозрачности и подотчетности.',
    button: 'Перейти в Центр доверия',
  },
  workflow: {
    title: 'Процесс от заказа до полета',
    text: 'Изучите полный путь от конфигурации самолета до сертификации летной годности и поставки.',
    button: 'Смотреть процесс',
  },
  quick: {
    title: 'Быстрые действия',
    text: 'Переходите напрямую к ключевым разделам платформы.',
    items: [
      {
        title: 'Пресейл',
        text: 'Текущие предложения пресейла самолетов и цены.',
        href: '/presale',
      },
      {
        title: 'Конфигуратор',
        text: 'Спроектируйте и настройте конфигурацию самолета.',
        href: '/configurator',
      },
      {
        title: 'Токен-фреймворк',
        text: 'Узнайте о токене ANGT и координационном слое.',
        href: '/token',
      },
      {
        title: 'Кабинет',
        text: 'Доступ к личному кабинету и документам.',
        href: '/dashboard',
      },
    ],
  },
  updates: {
    title: 'Последние обновления',
    text: 'Недавние анонсы и развитие платформы.',
    items: [
      {
        title: 'Запуск платформы',
        text: 'Платформа FlyANGT запущена с доступными основными модулями.',
        date: '2025-01',
        href: '/ecosystem',
      },
      {
        title: 'Центр доверия доступен',
        text: 'Доступ к документам соответствия и политикам в новом Центре доверия.',
        date: '2025-01',
        href: '/trust',
      },
      {
        title: 'Партнерская сеть открыта',
        text: 'MRO и учебные партнеры могут подавать заявки на сертификацию.',
        date: '2025-01',
        href: '/partners',
      },
      {
        title: 'Конфигуратор бета',
        text: 'Инструмент конфигурации самолета доступен для предпросмотра.',
        date: '2025-01',
        href: '/configurator',
      },
    ],
  },
  finalCta: {
    title: 'Готовы начать?',
    text: 'Присоединяйтесь к экосистеме FlyANGT. Будь вы владелец, инвестор или партнер, у нас есть путь для вас.',
    buttonPrimary: 'Создать аккаунт',
    buttonSecondary: 'Связаться с нами',
  },
  disclaimer:
    'Информация предоставлена только для общих целей. Спецификации самолета, цены и сроки могут быть изменены. Инвестиции связаны с риском. Все решения должны приниматься с соответствующей профессиональной консультацией.',
};

const homePageContent: Record<Locale, HomePageContent> = {
  en: homePageContentEn,
  ru: homePageContentRu,
};

/**
 * Get home page content by locale
 */
export function getHomeContent(locale: Locale): HomePageContent {
  return homePageContent[locale] ?? homePageContent.en;
}

/**
 * Legacy export for backward compatibility
 */
export const homeContent = {
  en: homePageContentEn,
  ru: homePageContentRu,
};
