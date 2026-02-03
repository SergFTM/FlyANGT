/**
 * Customers Page Content
 *
 * EN/RU localized content for the customer landing page.
 * MVP content-driven, no document delivery.
 */

import type { Locale } from '$config/i18n.config';
import type { PageContent, LocalizedContent } from '../types';

/**
 * Section item for steps and cards
 */
export interface CustomerSectionItem {
  title: string;
  text: string;
  bullets?: string[];
}

/**
 * Section content structure
 */
export interface CustomerSectionContent {
  id: string;
  title: string;
  text: string;
  bullets?: string[];
  variant?: 'default' | 'steps' | 'cards';
  items?: CustomerSectionItem[];
}

/**
 * Request docs form content
 */
export interface RequestDocsContent {
  title: string;
  text: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    country: string;
    interest: string;
    notes: string;
  };
  interestOptions: Array<{ id: string; label: string }>;
  submitLabel: string;
  successTitle: string;
  successText: string;
  editLabel: string;
  requiredLabel: string;
  invalidEmailLabel: string;
}

/**
 * Links block content
 */
export interface LinksBlockContent {
  title: string;
  text: string;
  items: Array<{ title: string; text: string; href: string }>;
}

/**
 * Customers page content structure
 */
export interface CustomersPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
    microText?: string;
  };
  sections: CustomerSectionContent[];
  requestDocs: RequestDocsContent;
  linksBlock: LinksBlockContent;
  disclaimer: string;
}

const customersPageContentEn: CustomersPageContent = {
  hero: {
    h1: 'Your Aircraft, Our Expertise',
    h2: 'FlyANGT guides you from kit assembly to flight-ready aircraft with structured processes, certified partners, and transparent documentation.',
    primaryCta: 'Request Information',
    secondaryCta: 'View Workflow',
    microText: 'No commitment required',
  },
  sections: [
    {
      id: 'what_you_get',
      title: 'What You Get',
      text: 'FlyANGT provides a complete value stack for kit aircraft ownership, from assembly guidance to ongoing service.',
      bullets: [
        'Guided Owner Assisted Build with checklists and photo logs',
        'Access to certified MRO partners and hangar facilities',
        'Pilot transition training and recurrent programs',
        'Digital documentation and compliance management',
        'Transparent process with milestone tracking',
      ],
    },
    {
      id: 'why_owner_assisted',
      title: 'Why Owner Assisted Build',
      text: 'Building your own aircraft creates a deeper connection and understanding of your machine while meeting regulatory requirements.',
      bullets: [
        'Step-by-step guidance with certified technician oversight',
        'Photo logs and documentation for every stage',
        'Quality checkpoints verified by professionals',
      ],
    },
    {
      id: 'journey',
      title: 'Your Journey',
      text: 'From initial interest to flying your aircraft, we guide you through each step with clear processes and support.',
      variant: 'steps',
      items: [
        {
          title: 'Configure',
          text: 'Design your aircraft with our configurator, select options, and understand the complete package.',
        },
        {
          title: 'Qualify',
          text: 'Complete documentation review, financial qualification, and regulatory compliance checks.',
        },
        {
          title: 'Contract',
          text: 'Review and sign agreements, confirm payment terms, and schedule your build slot.',
        },
        {
          title: 'Build',
          text: 'Participate in Owner Assisted Build with checklists, photo documentation, and technician guidance.',
        },
        {
          title: 'Test',
          text: 'Quality assurance, ground testing, flight testing, and airworthiness certification.',
        },
        {
          title: 'Train',
          text: 'Complete pilot transition training, emergency procedures, and systems familiarization.',
        },
        {
          title: 'Fly',
          text: 'Take delivery of your aircraft and begin your ownership journey with ongoing support.',
        },
      ],
    },
    {
      id: 'ownership',
      title: 'Ownership Models',
      text: 'Different ways to own and operate your aircraft, tailored to your needs and circumstances.',
      variant: 'cards',
      items: [
        {
          title: 'Full Ownership',
          text: 'Complete aircraft ownership with full control and responsibility.',
          bullets: ['Direct title ownership', 'Full operational control', 'All maintenance responsibility'],
        },
        {
          title: 'Company Ownership',
          text: 'Aircraft registered under business entity for operational and tax benefits.',
          bullets: ['Corporate structure benefits', 'Business expense treatment', 'Liability considerations'],
        },
        {
          title: 'Shared Ownership',
          text: 'Co-ownership arrangements with structured usage schedules and cost sharing.',
          bullets: ['Shared acquisition costs', 'Scheduled access', 'Split operating expenses'],
        },
        {
          title: 'Managed Access',
          text: 'Access to aircraft through management programs without full ownership.',
          bullets: ['Lower capital requirement', 'Professional management', 'Flexible scheduling'],
        },
        {
          title: 'Pilot Hours',
          text: 'Purchase flight time packages for training or personal use.',
          bullets: ['No ownership commitment', 'Pay-per-use model', 'Training focused'],
        },
      ],
    },
    {
      id: 'service',
      title: 'Service and Maintenance',
      text: 'Our partner network provides comprehensive maintenance coverage with transparent processes and documentation.',
      bullets: [
        'Scheduled A/B/C checks with certified technicians',
        'Parts sourcing through verified suppliers',
        'Warranty claim coordination and support',
        'Service history tracking in your digital cabinet',
        'Emergency support and AOG assistance',
      ],
    },
    {
      id: 'training',
      title: 'Training and Safety',
      text: 'Comprehensive training programs ensure you are fully prepared for safe aircraft operation.',
      bullets: [
        'Type-specific transition training with certified instructors',
        'Go/no-go decision culture and weather assessment',
        'Emergency procedures and scenario training',
        'Recurrent training programs and proficiency checks',
      ],
    },
    {
      id: 'digital_cabinet',
      title: 'Digital Cabinet',
      text: 'All your aircraft documentation, service records, and communications in one secure platform.',
      bullets: [
        'Centralized document storage with version control',
        'Service request tracking and history',
        'Direct communication with partners and support',
        'Compliance monitoring and renewal reminders',
      ],
    },
    {
      id: 'request_docs',
      title: 'Get More Information',
      text: 'Request detailed documentation about our programs, pricing, and process.',
    },
    {
      id: 'cta',
      title: 'Ready to Start?',
      text: 'Begin your aircraft ownership journey with FlyANGT. Our team is ready to guide you through every step.',
    },
  ],
  requestDocs: {
    title: 'Request Documentation',
    text: 'Fill out the form below to receive detailed information about our programs. Your request will be saved locally.',
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      interest: 'Primary Interest',
      notes: 'Additional Notes (optional)',
    },
    interestOptions: [
      { id: 'new_build', label: 'New Aircraft Build' },
      { id: 'existing_owner', label: 'Existing Aircraft Owner' },
      { id: 'training', label: 'Training Programs' },
      { id: 'service', label: 'Service and Maintenance' },
      { id: 'ownership_models', label: 'Ownership Models' },
      { id: 'general', label: 'General Information' },
    ],
    submitLabel: 'Submit Request',
    successTitle: 'Request Submitted',
    successText: 'Thank you for your interest. Your request has been saved locally. Our team will prepare the relevant documentation.',
    editLabel: 'Edit Request',
    requiredLabel: 'Required',
    invalidEmailLabel: 'Invalid email format',
  },
  linksBlock: {
    title: 'Explore More',
    text: 'Learn more about our processes and ecosystem.',
    items: [
      {
        title: 'Trust Center',
        text: 'Access compliance documents, policies, and forms.',
        href: '/trust',
      },
      {
        title: 'Order to Flight',
        text: 'Detailed workflow from configuration to delivery.',
        href: '/workflow',
      },
      {
        title: 'Configurator',
        text: 'Design and customize your aircraft.',
        href: '/configurator',
      },
      {
        title: 'Partners',
        text: 'Find service providers and training centers.',
        href: '/partners',
      },
    ],
  },
  disclaimer:
    'Information provided is for general purposes only. Aircraft specifications, pricing, and timelines are subject to change. All ownership and operational decisions should be made with appropriate professional advice. FlyANGT coordinates services but does not guarantee specific outcomes.',
};

const customersPageContentRu: CustomersPageContent = {
  hero: {
    h1: 'Ваш самолет, наша экспертиза',
    h2: 'FlyANGT сопровождает вас от сборки кита до готового к полету самолета со структурированными процессами, сертифицированными партнерами и прозрачной документацией.',
    primaryCta: 'Запросить информацию',
    secondaryCta: 'Смотреть процесс',
    microText: 'Без обязательств',
  },
  sections: [
    {
      id: 'what_you_get',
      title: 'Что вы получаете',
      text: 'FlyANGT предоставляет полный набор ценностей для владения кит-самолетом, от сопровождения сборки до постоянного обслуживания.',
      bullets: [
        'Сопровождаемая сборка с чек-листами и фотоотчетами',
        'Доступ к сертифицированным MRO партнерам и ангарам',
        'Переподготовка пилотов и программы повышения квалификации',
        'Цифровое управление документацией и соответствием',
        'Прозрачный процесс с отслеживанием этапов',
      ],
    },
    {
      id: 'why_owner_assisted',
      title: 'Почему сборка с участием владельца',
      text: 'Сборка собственного самолета создает более глубокую связь и понимание вашей машины, соответствуя регуляторным требованиям.',
      bullets: [
        'Пошаговое руководство с контролем сертифицированных техников',
        'Фотоотчеты и документация каждого этапа',
        'Контрольные точки качества, проверенные профессионалами',
      ],
    },
    {
      id: 'journey',
      title: 'Ваш путь',
      text: 'От первоначального интереса до полета на вашем самолете мы сопровождаем вас на каждом этапе с четкими процессами и поддержкой.',
      variant: 'steps',
      items: [
        {
          title: 'Конфигурация',
          text: 'Спроектируйте самолет в конфигураторе, выберите опции и изучите полный пакет.',
        },
        {
          title: 'Квалификация',
          text: 'Пройдите проверку документов, финансовую квалификацию и проверку соответствия.',
        },
        {
          title: 'Контракт',
          text: 'Изучите и подпишите договоры, подтвердите условия оплаты и запланируйте слот сборки.',
        },
        {
          title: 'Сборка',
          text: 'Участвуйте в сборке с чек-листами, фотодокументацией и руководством техников.',
        },
        {
          title: 'Тестирование',
          text: 'Контроль качества, наземные испытания, летные испытания и сертификация летной годности.',
        },
        {
          title: 'Обучение',
          text: 'Пройдите переподготовку пилота, аварийные процедуры и ознакомление с системами.',
        },
        {
          title: 'Полет',
          text: 'Примите поставку самолета и начните путь владельца с постоянной поддержкой.',
        },
      ],
    },
    {
      id: 'ownership',
      title: 'Модели владения',
      text: 'Различные способы владения и эксплуатации самолета, адаптированные к вашим потребностям.',
      variant: 'cards',
      items: [
        {
          title: 'Полное владение',
          text: 'Полное владение самолетом с полным контролем и ответственностью.',
          bullets: ['Прямое владение титулом', 'Полный операционный контроль', 'Вся ответственность за обслуживание'],
        },
        {
          title: 'Корпоративное владение',
          text: 'Самолет зарегистрирован на юридическое лицо для операционных и налоговых преимуществ.',
          bullets: ['Преимущества корпоративной структуры', 'Учет как бизнес-расходы', 'Учет ответственности'],
        },
        {
          title: 'Совместное владение',
          text: 'Совместное владение со структурированным графиком использования и разделением затрат.',
          bullets: ['Разделение затрат на приобретение', 'Запланированный доступ', 'Разделение операционных расходов'],
        },
        {
          title: 'Управляемый доступ',
          text: 'Доступ к самолету через программы управления без полного владения.',
          bullets: ['Меньшие капитальные требования', 'Профессиональное управление', 'Гибкое планирование'],
        },
        {
          title: 'Летные часы',
          text: 'Покупка пакетов летного времени для обучения или личного использования.',
          bullets: ['Без обязательства владения', 'Модель оплаты за использование', 'Фокус на обучение'],
        },
      ],
    },
    {
      id: 'service',
      title: 'Сервис и обслуживание',
      text: 'Наша партнерская сеть обеспечивает комплексное техническое обслуживание с прозрачными процессами и документацией.',
      bullets: [
        'Плановые проверки A/B/C с сертифицированными техниками',
        'Поставка запчастей через проверенных поставщиков',
        'Координация и поддержка гарантийных обращений',
        'Отслеживание истории обслуживания в цифровом кабинете',
        'Экстренная поддержка и помощь AOG',
      ],
    },
    {
      id: 'training',
      title: 'Обучение и безопасность',
      text: 'Комплексные программы обучения обеспечивают вашу полную готовность к безопасной эксплуатации.',
      bullets: [
        'Переподготовка по типу с сертифицированными инструкторами',
        'Культура решений go/no-go и оценка погоды',
        'Аварийные процедуры и сценарное обучение',
        'Программы повышения квалификации и проверки навыков',
      ],
    },
    {
      id: 'digital_cabinet',
      title: 'Цифровой кабинет',
      text: 'Вся документация на самолет, записи обслуживания и коммуникации на одной защищенной платформе.',
      bullets: [
        'Централизованное хранение документов с контролем версий',
        'Отслеживание сервисных запросов и истории',
        'Прямая связь с партнерами и поддержкой',
        'Мониторинг соответствия и напоминания о продлении',
      ],
    },
    {
      id: 'request_docs',
      title: 'Получить информацию',
      text: 'Запросите детальную документацию о наших программах, ценах и процессе.',
    },
    {
      id: 'cta',
      title: 'Готовы начать?',
      text: 'Начните путь владения самолетом с FlyANGT. Наша команда готова сопровождать вас на каждом этапе.',
    },
  ],
  requestDocs: {
    title: 'Запросить документацию',
    text: 'Заполните форму ниже для получения детальной информации о наших программах. Ваш запрос будет сохранен локально.',
    fields: {
      name: 'Полное имя',
      email: 'Email адрес',
      phone: 'Телефон',
      country: 'Страна',
      interest: 'Основной интерес',
      notes: 'Дополнительные заметки (опционально)',
    },
    interestOptions: [
      { id: 'new_build', label: 'Новая сборка самолета' },
      { id: 'existing_owner', label: 'Существующий владелец ВС' },
      { id: 'training', label: 'Программы обучения' },
      { id: 'service', label: 'Сервис и обслуживание' },
      { id: 'ownership_models', label: 'Модели владения' },
      { id: 'general', label: 'Общая информация' },
    ],
    submitLabel: 'Отправить запрос',
    successTitle: 'Запрос отправлен',
    successText: 'Благодарим за интерес. Ваш запрос сохранен локально. Наша команда подготовит соответствующую документацию.',
    editLabel: 'Редактировать запрос',
    requiredLabel: 'Обязательно',
    invalidEmailLabel: 'Неверный формат email',
  },
  linksBlock: {
    title: 'Узнать больше',
    text: 'Подробнее о наших процессах и экосистеме.',
    items: [
      {
        title: 'Центр доверия',
        text: 'Доступ к документам соответствия, политикам и формам.',
        href: '/trust',
      },
      {
        title: 'От заказа до полета',
        text: 'Детальный процесс от конфигурации до поставки.',
        href: '/workflow',
      },
      {
        title: 'Конфигуратор',
        text: 'Спроектируйте и настройте ваш самолет.',
        href: '/configurator',
      },
      {
        title: 'Партнеры',
        text: 'Найдите сервис-провайдеров и учебные центры.',
        href: '/partners',
      },
    ],
  },
  disclaimer:
    'Информация предоставлена только для общих целей. Спецификации самолета, цены и сроки могут быть изменены. Все решения о владении и эксплуатации должны приниматься с соответствующей профессиональной консультацией. FlyANGT координирует услуги, но не гарантирует конкретных результатов.',
};

const customersPageContent: Record<Locale, CustomersPageContent> = {
  en: customersPageContentEn,
  ru: customersPageContentRu,
};

/**
 * Get customers page content by locale
 */
export function getCustomersContent(locale: Locale): CustomersPageContent {
  return customersPageContent[locale] ?? customersPageContent.en;
}

/**
 * Legacy content export for backward compatibility
 */
export const customersContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'FlyANGT for Aircraft Owners',
      h2: 'Your Aviation Management Solution',
      trustLine: 'From assembly to service to documentation.',
      primaryCta: 'Get Started',
      secondaryCta: 'View Platform',
    },
    sections: [
      {
        id: 'use-cases',
        title: 'What You Can Do',
        text: 'FlyANGT supports aircraft owners through every stage of ownership.',
        bullets: [
          'Order and configure new aircraft',
          'Schedule maintenance and service',
          'Manage documentation centrally',
          'Coordinate with service providers',
        ],
      },
      {
        id: 'owner-benefits',
        title: 'Benefits for Owners',
        text: 'A single platform for all your aviation management needs.',
        bullets: [
          'Centralized document storage',
          'Service history tracking',
          'Transparent cost management',
          'Direct communication with providers',
        ],
      },
      {
        id: 'getting-started',
        title: 'Getting Started',
        text: 'Begin your FlyANGT journey in a few simple steps.',
        bullets: [
          'Create your account',
          'Add your aircraft details',
          'Connect with service providers',
          'Start managing from your cabinet',
        ],
      },
      {
        id: 'support',
        title: 'Customer Support',
        text: 'Our team is available to assist you with onboarding, questions, and technical support.',
      },
    ],
    finalCta: {
      title: 'Ready to Simplify Aircraft Ownership?',
      text: 'Join FlyANGT and experience structured aviation management.',
      button: 'Create Account',
    },
  },
  ru: {
    hero: {
      h1: 'FlyANGT для владельцев ВС',
      h2: 'Ваше решение для управления авиацией',
      trustLine: 'От сборки до обслуживания и документации.',
      primaryCta: 'Начать',
      secondaryCta: 'Смотреть платформу',
    },
    sections: [
      {
        id: 'use-cases',
        title: 'Что вы можете делать',
        text: 'FlyANGT поддерживает владельцев ВС на каждом этапе владения.',
        bullets: [
          'Заказывать и конфигурировать новые ВС',
          'Планировать ТО и обслуживание',
          'Централизованно управлять документацией',
          'Координировать с сервис провайдерами',
        ],
      },
      {
        id: 'owner-benefits',
        title: 'Преимущества для владельцев',
        text: 'Единая платформа для всех потребностей управления авиацией.',
        bullets: [
          'Централизованное хранение документов',
          'Отслеживание истории обслуживания',
          'Прозрачное управление затратами',
          'Прямая связь с провайдерами',
        ],
      },
      {
        id: 'getting-started',
        title: 'С чего начать',
        text: 'Начните ваш путь с FlyANGT в несколько простых шагов.',
        bullets: [
          'Создайте аккаунт',
          'Добавьте данные вашего ВС',
          'Свяжитесь с сервис провайдерами',
          'Начните управлять из кабинета',
        ],
      },
      {
        id: 'support',
        title: 'Поддержка клиентов',
        text: 'Наша команда готова помочь вам с онбордингом, вопросами и технической поддержкой.',
      },
    ],
    finalCta: {
      title: 'Готовы упростить владение ВС?',
      text: 'Присоединяйтесь к FlyANGT и ощутите структурированное управление авиацией.',
      button: 'Создать аккаунт',
    },
  },
};
