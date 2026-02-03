/**
 * Partners Page Content
 *
 * EN/RU localized content for the partners directory and profiles.
 */

import type { Locale } from '$config/i18n.config';
import type { PageContent, LocalizedContent } from '../types';

/**
 * Extended partners page content interface
 */
export interface PartnersPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  directory: {
    title: string;
    text: string;
    searchPlaceholder: string;
    filtersTitle: string;
    emptyTitle: string;
    emptyText: string;
  };
  partnerProfile: {
    servicesTitle: string;
    highlightsTitle: string;
    contactTitle: string;
    backLabel: string;
    websiteLabel: string;
    emailLabel: string;
    telegramLabel: string;
  };
  becomePartner: {
    title: string;
    text: string;
    fields: {
      company: string;
      name: string;
      email: string;
      type: string;
      region: string;
      message: string;
    };
    submitLabel: string;
    successTitle: string;
    successText: string;
    editLabel: string;
    requiredLabel: string;
    invalidEmailLabel: string;
  };
  trust: {
    title: string;
    text: string;
    button: string;
  };
  disclaimer: string;
}

const partnersPageContentEn: PartnersPageContent = {
  hero: {
    h1: 'Partner Directory',
    h2: 'Connect with certified aviation service providers and ecosystem partners',
    primaryCta: 'Become a Partner',
    secondaryCta: 'View Trust Center',
  },
  directory: {
    title: 'Our Partners',
    text: 'FlyANGT collaborates with certified dealers, MRO providers, hangar facilities, flight schools, and digital service partners worldwide.',
    searchPlaceholder: 'Search partners...',
    filtersTitle: 'Filters',
    emptyTitle: 'No partners found',
    emptyText: 'Try adjusting your search or filters to find partners.',
  },
  partnerProfile: {
    servicesTitle: 'Services',
    highlightsTitle: 'Highlights',
    contactTitle: 'Contact',
    backLabel: 'Back to Directory',
    websiteLabel: 'Website',
    emailLabel: 'Email',
    telegramLabel: 'Telegram',
  },
  becomePartner: {
    title: 'Become a Partner',
    text: 'Join the FlyANGT ecosystem and connect with aircraft owners and participants. MoU, SLA, and QA checklists are coordinated via the platform.',
    fields: {
      company: 'Company Name',
      name: 'Contact Name',
      email: 'Email Address',
      type: 'Partner Type',
      region: 'Region',
      message: 'Message (optional)',
    },
    submitLabel: 'Submit Application',
    successTitle: 'Application Submitted',
    successText: 'Thank you for your interest in becoming a FlyANGT partner. Your draft has been saved locally. Our team will review your application.',
    editLabel: 'Edit Application',
    requiredLabel: 'Required',
    invalidEmailLabel: 'Invalid email format',
  },
  trust: {
    title: 'Partner Documentation',
    text: 'Review our partner guidelines, SLA templates, quality assurance standards, and compliance requirements in the Trust Center.',
    button: 'Open Trust Center',
  },
  disclaimer:
    'Partner listings are provided for informational purposes. FlyANGT does not guarantee the availability or quality of services. All partnerships are subject to terms and conditions outlined in the Trust Center.',
};

const partnersPageContentRu: PartnersPageContent = {
  hero: {
    h1: 'Каталог партнеров',
    h2: 'Связывайтесь с сертифицированными авиационными сервис-провайдерами и партнерами экосистемы',
    primaryCta: 'Стать партнером',
    secondaryCta: 'Центр доверия',
  },
  directory: {
    title: 'Наши партнеры',
    text: 'FlyANGT сотрудничает с сертифицированными дилерами, провайдерами ТО и Р, ангарными объектами, летными школами и цифровыми сервисными партнерами по всему миру.',
    searchPlaceholder: 'Поиск партнеров...',
    filtersTitle: 'Фильтры',
    emptyTitle: 'Партнеры не найдены',
    emptyText: 'Попробуйте изменить поиск или фильтры для поиска партнеров.',
  },
  partnerProfile: {
    servicesTitle: 'Услуги',
    highlightsTitle: 'Особенности',
    contactTitle: 'Контакты',
    backLabel: 'К каталогу',
    websiteLabel: 'Веб-сайт',
    emailLabel: 'Email',
    telegramLabel: 'Telegram',
  },
  becomePartner: {
    title: 'Стать партнером',
    text: 'Присоединяйтесь к экосистеме FlyANGT и связывайтесь с владельцами воздушных судов и участниками. MoU, SLA и чек-листы QA координируются через платформу.',
    fields: {
      company: 'Название компании',
      name: 'Контактное лицо',
      email: 'Email адрес',
      type: 'Тип партнера',
      region: 'Регион',
      message: 'Сообщение (опционально)',
    },
    submitLabel: 'Отправить заявку',
    successTitle: 'Заявка отправлена',
    successText: 'Благодарим за интерес к партнерству с FlyANGT. Ваш черновик сохранен локально. Наша команда рассмотрит вашу заявку.',
    editLabel: 'Редактировать заявку',
    requiredLabel: 'Обязательно',
    invalidEmailLabel: 'Неверный формат email',
  },
  trust: {
    title: 'Документация для партнеров',
    text: 'Ознакомьтесь с руководствами для партнеров, шаблонами SLA, стандартами качества и требованиями соответствия в Центре доверия.',
    button: 'Открыть Центр доверия',
  },
  disclaimer:
    'Списки партнеров предоставлены в информационных целях. FlyANGT не гарантирует доступность или качество услуг. Все партнерства регулируются условиями, изложенными в Центре доверия.',
};

const partnersPageContent: Record<Locale, PartnersPageContent> = {
  en: partnersPageContentEn,
  ru: partnersPageContentRu,
};

/**
 * Get partners page content by locale
 */
export function getPartnersContent(locale: Locale): PartnersPageContent {
  return partnersPageContent[locale] ?? partnersPageContent.en;
}

/**
 * Legacy content export for backward compatibility
 */
export const partnersContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'Partner with FlyANGT',
      h2: 'Join the Aviation Ecosystem',
      trustLine: 'Service providers, manufacturers, training centers.',
      primaryCta: 'Become a Partner',
      secondaryCta: 'View Benefits',
    },
    sections: [
      {
        id: 'partner-types',
        title: 'Partner Categories',
        text: 'FlyANGT works with various types of partners to build a complete aviation ecosystem.',
        bullets: [
          'Service and maintenance providers',
          'Aircraft manufacturers and dealers',
          'Training and certification centers',
          'Financial and compliance partners',
        ],
      },
      {
        id: 'partner-benefits',
        title: 'Partner Benefits',
        text: 'Joining FlyANGT gives you access to a structured network of aircraft owners and participants.',
        bullets: [
          'Access to qualified leads',
          'Streamlined service coordination',
          'Digital workflow integration',
          'Brand visibility in the ecosystem',
        ],
      },
      {
        id: 'how-to-join',
        title: 'How to Become a Partner',
        text: 'Our partnership process is straightforward and transparent.',
        bullets: [
          'Submit partner application',
          'Verification and due diligence',
          'Integration and onboarding',
          'Launch and collaboration',
        ],
      },
      {
        id: 'current-partners',
        title: 'Our Partners',
        text: 'FlyANGT collaborates with certified service providers, manufacturers, and industry experts across aviation sectors.',
      },
    ],
    finalCta: {
      title: 'Ready to Partner?',
      text: 'Join the FlyANGT ecosystem and connect with aircraft owners and participants worldwide.',
      button: 'Apply Now',
    },
  },
  ru: {
    hero: {
      h1: 'Партнёрство с FlyANGT',
      h2: 'Присоединяйтесь к авиационной экосистеме',
      trustLine: 'Сервисные провайдеры, производители, учебные центры.',
      primaryCta: 'Стать партнёром',
      secondaryCta: 'Смотреть преимущества',
    },
    sections: [
      {
        id: 'partner-types',
        title: 'Категории партнёров',
        text: 'FlyANGT работает с различными партнёрами для создания полной авиационной экосистемы.',
        bullets: [
          'Сервисные и ТО провайдеры',
          'Производители и дилеры ВС',
          'Учебные и сертификационные центры',
          'Финансовые и комплаенс партнёры',
        ],
      },
      {
        id: 'partner-benefits',
        title: 'Преимущества партнёрства',
        text: 'Присоединение к FlyANGT даёт доступ к структурированной сети владельцев ВС и участников.',
        bullets: [
          'Доступ к квалифицированным лидам',
          'Оптимизированная координация услуг',
          'Интеграция цифровых рабочих процессов',
          'Видимость бренда в экосистеме',
        ],
      },
      {
        id: 'how-to-join',
        title: 'Как стать партнёром',
        text: 'Наш процесс партнёрства прост и прозрачен.',
        bullets: [
          'Подайте заявку на партнёрство',
          'Верификация и due diligence',
          'Интеграция и онбординг',
          'Запуск и сотрудничество',
        ],
      },
      {
        id: 'current-partners',
        title: 'Наши партнёры',
        text: 'FlyANGT сотрудничает с сертифицированными сервис провайдерами, производителями и отраслевыми экспертами.',
      },
    ],
    finalCta: {
      title: 'Готовы к партнёрству?',
      text: 'Присоединяйтесь к экосистеме FlyANGT и связывайтесь с владельцами ВС и участниками по всему миру.',
      button: 'Подать заявку',
    },
  },
};
