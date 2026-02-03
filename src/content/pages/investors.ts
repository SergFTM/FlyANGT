/**
 * Investors Page Content
 *
 * EN/RU localized content for the investor landing page.
 * No financial advice, no guarantees, no specific numbers.
 */

import type { Locale } from '$config/i18n.config';
import type { PageContent, LocalizedContent } from '../types';

/**
 * Section content structure
 */
export interface InvestorSectionContent {
  id: string;
  title: string;
  text: string;
  bullets?: string[];
  variant?: 'default' | 'checklist' | 'cards';
}

/**
 * Metric item content
 */
export interface InvestorMetricContent {
  label: string;
  note: string;
}

/**
 * Deck request form content
 */
export interface DeckRequestContent {
  title: string;
  text: string;
  fields: {
    name: string;
    email: string;
    investorType: string;
    ticket: string;
    notes: string;
  };
  investorTypes: Array<{ id: string; label: string }>;
  ticketRanges: Array<{ id: string; label: string }>;
  submitLabel: string;
  successTitle: string;
  successText: string;
  editLabel: string;
  requiredLabel: string;
  invalidEmailLabel: string;
}

/**
 * Investors page content structure
 */
export interface InvestorsPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
    microText?: string;
  };
  sections: InvestorSectionContent[];
  metrics: {
    title: string;
    text: string;
    items: InvestorMetricContent[];
  };
  deckRequest: DeckRequestContent;
  trust: {
    title: string;
    text: string;
    button: string;
  };
  disclaimer: string;
}

const investorsPageContentEn: InvestorsPageContent = {
  hero: {
    h1: 'Invest in Aviation Infrastructure',
    h2: 'FlyANGT builds the operational layer for kit aircraft ownership, combining physical services with digital coordination.',
    primaryCta: 'Request Investor Deck',
    secondaryCta: 'View Trust Center',
    microText: 'No commitment required',
  },
  sections: [
    {
      id: 'thesis',
      title: 'Investment Thesis',
      text: 'FlyANGT addresses a structural gap in general aviation: kit aircraft owners lack coordinated access to certified services, training, and maintenance networks.',
      bullets: [
        'Kit aircraft represent a growing segment with underserved operational needs',
        'Fragmented service landscape creates friction for owners and partners',
        'Platform approach enables scalable coordination without heavy asset ownership',
      ],
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      text: 'The kit aircraft market continues to expand globally, driven by cost advantages and regulatory developments. FlyANGT targets the operational services layer.',
      bullets: [
        'Growing kit aircraft registrations in Europe, MENA, and emerging markets',
        'Limited institutional service providers for this aircraft category',
        'Recurring revenue potential from maintenance, training, and compliance services',
        'Network effects as partner ecosystem and user base grow',
      ],
    },
    {
      id: 'stack',
      title: 'Product Stack',
      text: 'FlyANGT operates a hybrid model combining offline aviation services with digital platform capabilities.',
      bullets: [
        'Build Assist: Guided kit assembly with certified technician oversight',
        'Service Network: MRO, hangar, and training partner coordination',
        'Digital Platform: Workflow management, document handling, compliance tracking',
        'Token Layer: Utility token for platform services and ecosystem participation',
      ],
      variant: 'cards',
    },
    {
      id: 'revenue',
      title: 'Revenue Model',
      text: 'Multiple revenue streams from both offline services and digital platform operations.',
      bullets: [
        'Service fees from Build Assist programs and consultation',
        'Partner referral and coordination fees',
        'Platform subscription and transaction fees',
        'Token utility fees and ecosystem participation',
        'Training and certification program fees',
      ],
    },
    {
      id: 'unit_economics',
      title: 'What We Validate',
      text: 'Our unit economics framework focuses on validating key operational and financial metrics before scaling.',
      bullets: [
        'Customer acquisition cost relative to lifetime value',
        'Service margin sustainability across partner network',
        'Platform engagement and retention metrics',
        'Token velocity and utility adoption patterns',
        'Partner network growth and retention rates',
      ],
      variant: 'checklist',
    },
    {
      id: 'presale_plan',
      title: 'Presale to Listing',
      text: 'A structured 10-week program from token presale through exchange listing, with clear milestones and transparency.',
      bullets: [
        'Phase 1: Presale launch with early participant benefits',
        'Phase 2: Community building and ecosystem development',
        'Phase 3: Platform feature rollout and partner onboarding',
        'Phase 4: Compliance verification and audit completion',
        'Phase 5: Exchange listing and liquidity provision',
      ],
    },
    {
      id: 'token_role',
      title: 'Token Utility',
      text: 'The ANGT token serves as the utility layer for platform services, not as a speculative investment vehicle.',
      bullets: [
        'Service access and discount mechanism within platform',
        'Ecosystem participation and governance signaling',
        'Partner and user incentive alignment',
      ],
    },
    {
      id: 'trust',
      title: 'Transparency',
      text: 'All documentation, compliance reports, and operational details are available in our Trust Center.',
    },
    {
      id: 'cta',
      title: 'Get the Full Picture',
      text: 'Request our investor deck for detailed information on market analysis, financial projections, and team background.',
    },
  ],
  metrics: {
    title: 'Validation Framework',
    text: 'Key metrics we track and validate before scaling operations.',
    items: [
      { label: 'Customer Acquisition Cost', note: 'Cost to acquire qualified aircraft owner' },
      { label: 'Conversion Rate', note: 'Lead to paying customer conversion' },
      { label: 'Gross Margin', note: 'Service and platform margin targets' },
      { label: 'Service Utilization', note: 'Partner capacity utilization rate' },
      { label: 'Lifetime Value', note: 'Total customer value over relationship' },
      { label: 'Build Assist Capacity', note: 'Concurrent projects capacity' },
      { label: 'Net Promoter Score', note: 'Customer satisfaction indicator' },
      { label: 'Warranty Claims Rate', note: 'Service quality indicator' },
      { label: 'Training Attach Rate', note: 'Training upsell conversion' },
      { label: 'Token Velocity', note: 'Token utility and circulation' },
      { label: 'Partner Retention', note: 'Annual partner retention rate' },
      { label: 'Platform GMV', note: 'Gross merchandise value indicator' },
    ],
  },
  deckRequest: {
    title: 'Request Investor Deck',
    text: 'Complete the form below to receive our detailed investor presentation. Your information will be saved locally as a draft.',
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      investorType: 'Investor Type',
      ticket: 'Expected Ticket Size',
      notes: 'Additional Notes (optional)',
    },
    investorTypes: [
      { id: 'angel', label: 'Angel Investor' },
      { id: 'vc', label: 'Venture Capital' },
      { id: 'family_office', label: 'Family Office' },
      { id: 'strategic', label: 'Strategic Investor' },
      { id: 'other', label: 'Other' },
    ],
    ticketRanges: [
      { id: 'under_50k', label: 'Under $50K' },
      { id: '50k_250k', label: '$50K - $250K' },
      { id: '250k_1m', label: '$250K - $1M' },
      { id: 'over_1m', label: 'Over $1M' },
      { id: 'undisclosed', label: 'Prefer not to say' },
    ],
    submitLabel: 'Submit Request',
    successTitle: 'Request Submitted',
    successText: 'Thank you for your interest. Your request has been saved locally. Our team will review and follow up.',
    editLabel: 'Edit Request',
    requiredLabel: 'Required',
    invalidEmailLabel: 'Invalid email format',
  },
  trust: {
    title: 'Trust Center',
    text: 'Review our compliance documentation, legal structure, and operational transparency reports.',
    button: 'Open Trust Center',
  },
  disclaimer:
    'This page is for informational purposes only and does not constitute financial advice, an offer to sell, or a solicitation of an offer to buy any securities or tokens. Past performance is not indicative of future results. Investment involves risk. Please consult your financial advisor before making investment decisions.',
};

const investorsPageContentRu: InvestorsPageContent = {
  hero: {
    h1: 'Инвестируйте в авиационную инфраструктуру',
    h2: 'FlyANGT создает операционный слой для владения кит-самолетами, объединяя физические услуги с цифровой координацией.',
    primaryCta: 'Запросить презентацию',
    secondaryCta: 'Центр доверия',
    microText: 'Без обязательств',
  },
  sections: [
    {
      id: 'thesis',
      title: 'Инвестиционный тезис',
      text: 'FlyANGT решает структурную проблему в малой авиации: владельцы кит-самолетов не имеют координированного доступа к сертифицированным услугам, обучению и сетям обслуживания.',
      bullets: [
        'Кит-самолеты представляют растущий сегмент с недостаточно обслуживаемыми операционными потребностями',
        'Фрагментированный ландшафт услуг создает трение для владельцев и партнеров',
        'Платформенный подход обеспечивает масштабируемую координацию без значительных активов',
      ],
    },
    {
      id: 'market',
      title: 'Рыночная возможность',
      text: 'Рынок кит-самолетов продолжает расширяться глобально, движимый ценовыми преимуществами и регуляторными изменениями. FlyANGT нацелен на слой операционных услуг.',
      bullets: [
        'Рост регистраций кит-самолетов в Европе, MENA и развивающихся рынках',
        'Ограниченное количество институциональных провайдеров для этой категории ВС',
        'Потенциал регулярного дохода от обслуживания, обучения и услуг соответствия',
        'Сетевые эффекты по мере роста партнерской экосистемы и базы пользователей',
      ],
    },
    {
      id: 'stack',
      title: 'Продуктовый стек',
      text: 'FlyANGT использует гибридную модель, объединяющую офлайн авиационные услуги с возможностями цифровой платформы.',
      bullets: [
        'Build Assist: Сопровождаемая сборка с контролем сертифицированных техников',
        'Сеть услуг: Координация MRO, ангаров и учебных партнеров',
        'Цифровая платформа: Управление процессами, документами, отслеживание соответствия',
        'Токен-слой: Утилитарный токен для услуг платформы и участия в экосистеме',
      ],
      variant: 'cards',
    },
    {
      id: 'revenue',
      title: 'Модель дохода',
      text: 'Множественные потоки дохода от офлайн-услуг и операций цифровой платформы.',
      bullets: [
        'Сервисные сборы от программ Build Assist и консультаций',
        'Партнерские реферальные и координационные сборы',
        'Подписка и транзакционные сборы платформы',
        'Сборы за использование токена и участие в экосистеме',
        'Сборы за программы обучения и сертификации',
      ],
    },
    {
      id: 'unit_economics',
      title: 'Что мы валидируем',
      text: 'Наша система юнит-экономики фокусируется на валидации ключевых операционных и финансовых метрик перед масштабированием.',
      bullets: [
        'Стоимость привлечения клиента относительно пожизненной ценности',
        'Устойчивость маржи услуг по партнерской сети',
        'Метрики вовлеченности и удержания платформы',
        'Скорость оборота токена и паттерны принятия утилиты',
        'Темпы роста и удержания партнерской сети',
      ],
      variant: 'checklist',
    },
    {
      id: 'presale_plan',
      title: 'От пресейла до листинга',
      text: 'Структурированная 10-недельная программа от пресейла токена до листинга на бирже с четкими этапами и прозрачностью.',
      bullets: [
        'Фаза 1: Запуск пресейла с преимуществами для ранних участников',
        'Фаза 2: Построение сообщества и развитие экосистемы',
        'Фаза 3: Развертывание функций платформы и онбординг партнеров',
        'Фаза 4: Верификация соответствия и завершение аудита',
        'Фаза 5: Листинг на бирже и обеспечение ликвидности',
      ],
    },
    {
      id: 'token_role',
      title: 'Утилита токена',
      text: 'Токен ANGT служит утилитарным слоем для услуг платформы, а не спекулятивным инвестиционным инструментом.',
      bullets: [
        'Механизм доступа к услугам и скидок внутри платформы',
        'Участие в экосистеме и сигнализация управления',
        'Выравнивание стимулов партнеров и пользователей',
      ],
    },
    {
      id: 'trust',
      title: 'Прозрачность',
      text: 'Вся документация, отчеты о соответствии и операционные детали доступны в нашем Центре доверия.',
    },
    {
      id: 'cta',
      title: 'Получите полную картину',
      text: 'Запросите нашу презентацию для инвесторов с детальной информацией о рыночном анализе, финансовых прогнозах и команде.',
    },
  ],
  metrics: {
    title: 'Система валидации',
    text: 'Ключевые метрики, которые мы отслеживаем и валидируем перед масштабированием операций.',
    items: [
      { label: 'Стоимость привлечения клиента', note: 'Затраты на привлечение квалифицированного владельца ВС' },
      { label: 'Конверсия', note: 'Конверсия лида в платящего клиента' },
      { label: 'Валовая маржа', note: 'Целевая маржа услуг и платформы' },
      { label: 'Утилизация услуг', note: 'Коэффициент загрузки мощностей партнеров' },
      { label: 'Пожизненная ценность', note: 'Общая ценность клиента за время отношений' },
      { label: 'Емкость Build Assist', note: 'Емкость параллельных проектов' },
      { label: 'Net Promoter Score', note: 'Индикатор удовлетворенности клиентов' },
      { label: 'Гарантийные обращения', note: 'Индикатор качества услуг' },
      { label: 'Attach Rate обучения', note: 'Конверсия допродажи обучения' },
      { label: 'Скорость токена', note: 'Утилита и циркуляция токена' },
      { label: 'Удержание партнеров', note: 'Годовой показатель удержания партнеров' },
      { label: 'GMV платформы', note: 'Индикатор валового объема товаров' },
    ],
  },
  deckRequest: {
    title: 'Запросить презентацию',
    text: 'Заполните форму ниже для получения детальной презентации для инвесторов. Ваша информация будет сохранена локально как черновик.',
    fields: {
      name: 'Полное имя',
      email: 'Email адрес',
      investorType: 'Тип инвестора',
      ticket: 'Ожидаемый размер чека',
      notes: 'Дополнительные заметки (опционально)',
    },
    investorTypes: [
      { id: 'angel', label: 'Бизнес-ангел' },
      { id: 'vc', label: 'Венчурный капитал' },
      { id: 'family_office', label: 'Family Office' },
      { id: 'strategic', label: 'Стратегический инвестор' },
      { id: 'other', label: 'Другое' },
    ],
    ticketRanges: [
      { id: 'under_50k', label: 'До $50K' },
      { id: '50k_250k', label: '$50K - $250K' },
      { id: '250k_1m', label: '$250K - $1M' },
      { id: 'over_1m', label: 'Более $1M' },
      { id: 'undisclosed', label: 'Предпочитаю не указывать' },
    ],
    submitLabel: 'Отправить запрос',
    successTitle: 'Запрос отправлен',
    successText: 'Благодарим за интерес. Ваш запрос сохранен локально. Наша команда рассмотрит и свяжется с вами.',
    editLabel: 'Редактировать запрос',
    requiredLabel: 'Обязательно',
    invalidEmailLabel: 'Неверный формат email',
  },
  trust: {
    title: 'Центр доверия',
    text: 'Ознакомьтесь с нашей документацией по соответствию, юридической структурой и отчетами об операционной прозрачности.',
    button: 'Открыть Центр доверия',
  },
  disclaimer:
    'Эта страница предназначена только для информационных целей и не является финансовой консультацией, предложением о продаже или приглашением к покупке ценных бумаг или токенов. Прошлые результаты не гарантируют будущих показателей. Инвестиции связаны с риском. Пожалуйста, проконсультируйтесь с финансовым консультантом перед принятием инвестиционных решений.',
};

const investorsPageContent: Record<Locale, InvestorsPageContent> = {
  en: investorsPageContentEn,
  ru: investorsPageContentRu,
};

/**
 * Get investors page content by locale
 */
export function getInvestorsContent(locale: Locale): InvestorsPageContent {
  return investorsPageContent[locale] ?? investorsPageContent.en;
}

/**
 * Legacy content export for backward compatibility
 */
export const investorsContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'Invest in FlyANGT',
      h2: 'Participate in Aviation Projects',
      trustLine: 'Structured participation, transparent coordination.',
      primaryCta: 'Learn About Opportunities',
      secondaryCta: 'View Ecosystem',
    },
    sections: [
      {
        id: 'opportunity',
        title: 'Participation Opportunity',
        text: 'FlyANGT offers structured participation in aviation projects through our tokenization layer.',
        bullets: [
          'Aircraft project participation',
          'Hub service investments',
          'Platform development support',
          'Ecosystem growth initiatives',
        ],
      },
      {
        id: 'how-it-works',
        title: 'How Participation Works',
        text: 'A straightforward process from registration to active participation in aviation projects.',
        bullets: [
          'Register and complete verification',
          'Review available projects',
          'Participate through tokens',
          'Track status in your cabinet',
        ],
      },
      {
        id: 'transparency',
        title: 'Transparency Commitment',
        text: 'All participation records are tracked on our platform with full audit trails and reporting.',
        bullets: [
          'Regular project updates',
          'Verifiable participation records',
          'Compliance documentation',
          'Trust Center access (coming soon)',
        ],
      },
      {
        id: 'risks',
        title: 'Risk Acknowledgement',
        text: 'All participation involves risks. Please review our disclosures carefully.',
        bullets: [
          'Aviation projects carry inherent risks',
          'No guaranteed returns',
          'Token values may fluctuate',
          'Regulatory requirements apply',
        ],
      },
    ],
    finalCta: {
      title: 'Interested in Participating?',
      text: 'Contact our team to learn more about current and upcoming aviation projects.',
      button: 'Contact Us',
    },
  },
  ru: {
    hero: {
      h1: 'Инвестируйте в FlyANGT',
      h2: 'Участвуйте в авиационных проектах',
      trustLine: 'Структурированное участие, прозрачная координация.',
      primaryCta: 'Узнать о возможностях',
      secondaryCta: 'Смотреть экосистему',
    },
    sections: [
      {
        id: 'opportunity',
        title: 'Возможности участия',
        text: 'FlyANGT предлагает структурированное участие в авиапроектах через слой токенизации.',
        bullets: [
          'Участие в проектах ВС',
          'Инвестиции в услуги хаба',
          'Поддержка развития платформы',
          'Инициативы роста экосистемы',
        ],
      },
      {
        id: 'how-it-works',
        title: 'Как работает участие',
        text: 'Простой процесс от регистрации до активного участия в авиационных проектах.',
        bullets: [
          'Зарегистрируйтесь и пройдите верификацию',
          'Изучите доступные проекты',
          'Участвуйте через токены',
          'Отслеживайте статус в кабинете',
        ],
      },
      {
        id: 'transparency',
        title: 'Обязательство прозрачности',
        text: 'Все записи участия отслеживаются на платформе с полными аудиторскими следами и отчётностью.',
        bullets: [
          'Регулярные обновления проектов',
          'Верифицируемые записи участия',
          'Документация соответствия',
          'Доступ к Центру доверия (скоро)',
        ],
      },
      {
        id: 'risks',
        title: 'Признание рисков',
        text: 'Любое участие связано с рисками. Пожалуйста, внимательно изучите наши раскрытия.',
        bullets: [
          'Авиапроекты несут присущие риски',
          'Нет гарантированной доходности',
          'Стоимость токенов может колебаться',
          'Применяются регуляторные требования',
        ],
      },
    ],
    finalCta: {
      title: 'Заинтересованы в участии?',
      text: 'Свяжитесь с нашей командой, чтобы узнать больше о текущих и предстоящих авиапроектах.',
      button: 'Связаться с нами',
    },
  },
};
