/**
 * Tokenization Page Content
 *
 * EN and RU versions of tokenization page copy.
 * Includes required risk disclosure section.
 */

import type { Locale } from '$config/i18n.config';
import type { PageContent, LocalizedContent } from '../types';

/**
 * Extended tokenization page content interface
 */
export interface TokenizationPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sectionCta: {
    label: string;
  };
  riskBlock: {
    title: string;
    points: string[];
    footer: string;
  };
  disclaimer: string;
}

const tokenizationPageContentEn: TokenizationPageContent = {
  hero: {
    h1: 'Tokenization Framework',
    h2: 'A coordination layer for transparent aviation operations',
    primaryCta: 'Review Documentation',
    secondaryCta: 'View Whitepaper',
  },
  sectionCta: {
    label: 'Learn More',
  },
  riskBlock: {
    title: 'Important Risk Information',
    points: [
      'Tokens are functional units within the FlyANGT platform and are not securities, equity shares, or investment contracts.',
      'There are no guaranteed returns, dividends, or financial outcomes associated with token participation.',
      'Technology risks exist, including potential smart contract vulnerabilities, system failures, and cybersecurity threats.',
      'Regulatory environments may change, affecting token utility and platform operations in various jurisdictions.',
    ],
    footer: 'By participating in the FlyANGT tokenization framework, you acknowledge these risks. Full documentation is available in the Trust Center.',
  },
  disclaimer:
    'This page provides general information about the FlyANGT tokenization framework. Nothing on this page constitutes investment advice, financial recommendation, or an offer to sell securities. All participants must review the full documentation in the Trust Center before engaging with the platform.',
};

const tokenizationPageContentRu: TokenizationPageContent = {
  hero: {
    h1: 'Фреймворк токенизации',
    h2: 'Координационный слой для прозрачных авиационных операций',
    primaryCta: 'Обзор документации',
    secondaryCta: 'Белая книга',
  },
  sectionCta: {
    label: 'Подробнее',
  },
  riskBlock: {
    title: 'Важная информация о рисках',
    points: [
      'Токены являются функциональными единицами платформы FlyANGT и не являются ценными бумагами, долями или инвестиционными контрактами.',
      'Не существует гарантированной доходности, дивидендов или финансовых результатов, связанных с участием в токенах.',
      'Существуют технологические риски, включая потенциальные уязвимости смарт-контрактов, сбои систем и киберугрозы.',
      'Регуляторная среда может измениться, что повлияет на полезность токенов и операции платформы в различных юрисдикциях.',
    ],
    footer: 'Участвуя в фреймворке токенизации FlyANGT, вы признаете эти риски. Полная документация доступна в Центре доверия.',
  },
  disclaimer:
    'Эта страница содержит общую информацию о фреймворке токенизации FlyANGT. Ничто на этой странице не является инвестиционным советом, финансовой рекомендацией или предложением о продаже ценных бумаг. Все участники должны ознакомиться с полной документацией в Центре доверия перед использованием платформы.',
};

const tokenizationPageContent: Record<Locale, TokenizationPageContent> = {
  en: tokenizationPageContentEn,
  ru: tokenizationPageContentRu,
};

/**
 * Get tokenization page content by locale
 */
export function getTokenizationContent(locale: Locale): TokenizationPageContent {
  return tokenizationPageContent[locale] ?? tokenizationPageContent.en;
}

/**
 * Legacy content export for backward compatibility
 */
export const tokenizationContent: LocalizedContent<PageContent> = {
  en: {
    hero: {
      h1: 'Tokenization in FlyANGT',
      h2: 'Coordination and Transparency, Not Speculation',
      trustLine: 'Digital tokens for structured participation.',
      primaryCta: 'Learn More',
      secondaryCta: 'View Ecosystem',
    },
    sections: [
      {
        id: 'what-is-token',
        title: 'What is a FlyANGT Token?',
        text: 'A digital record representing your participation in aviation projects. Tokens provide transparency, not financial returns.',
        bullets: [
          'Represents participation in a project',
          'Tracked on a distributed ledger',
          'Verifiable and auditable',
          'Not a security or investment product',
        ],
      },
      {
        id: 'how-tokens-work',
        title: 'How Tokens Work',
        text: 'When you participate in a project, tokens are issued to your account. They track your involvement and provide access to project updates.',
        bullets: [
          'Issued upon participation',
          'Viewable in your personal cabinet',
          'Linked to specific aircraft or projects',
          'Transferable per platform rules',
        ],
      },
      {
        id: 'benefits',
        title: 'Benefits of Tokenization',
        text: 'Transparency, coordination, and verifiable records for all participants in the ecosystem.',
        bullets: [
          'Clear participation records',
          'Reduced paperwork and disputes',
          'Automated compliance tracking',
          'Immutable audit trail',
        ],
      },
      {
        id: 'disclaimer',
        title: 'Important Disclaimer',
        text: 'Please read and understand the following before participating.',
        bullets: [
          'Tokens are not speculation instruments',
          'Tokens are not securities or investment contracts',
          'No guaranteed returns or profits',
          'Participation involves project risks',
          'Past performance does not indicate future results',
        ],
      },
    ],
    finalCta: {
      title: 'Questions About Tokenization?',
      text: 'Our team is available to explain how tokens work within the FlyANGT ecosystem.',
      button: 'Contact Us',
    },
  },
  ru: {
    hero: {
      h1: 'Токенизация в FlyANGT',
      h2: 'Координация и прозрачность, не спекуляция',
      trustLine: 'Цифровые токены для структурированного участия.',
      primaryCta: 'Узнать больше',
      secondaryCta: 'Смотреть экосистему',
    },
    sections: [
      {
        id: 'what-is-token',
        title: 'Что такое токен FlyANGT?',
        text: 'Цифровая запись, представляющая ваше участие в авиапроектах. Токены обеспечивают прозрачность, не финансовую доходность.',
        bullets: [
          'Представляет участие в проекте',
          'Учитывается в распределённом реестре',
          'Верифицируемый и аудируемый',
          'Не ценная бумага и не инвестпродукт',
        ],
      },
      {
        id: 'how-tokens-work',
        title: 'Как работают токены',
        text: 'При участии в проекте токены выпускаются на ваш аккаунт. Они отслеживают ваше вовлечение и дают доступ к обновлениям проекта.',
        bullets: [
          'Выпускаются при участии',
          'Видны в личном кабинете',
          'Привязаны к конкретным ВС или проектам',
          'Передаваемы по правилам платформы',
        ],
      },
      {
        id: 'benefits',
        title: 'Преимущества токенизации',
        text: 'Прозрачность, координация и верифицируемые записи для всех участников экосистемы.',
        bullets: [
          'Ясные записи участия',
          'Меньше бумажной работы и споров',
          'Автоматическое отслеживание соответствия',
          'Неизменяемый аудиторский след',
        ],
      },
      {
        id: 'disclaimer',
        title: 'Важный дисклеймер',
        text: 'Пожалуйста, прочитайте и поймите следующее перед участием.',
        bullets: [
          'Токены не являются спекулятивными инструментами',
          'Токены не являются ценными бумагами или инвестконтрактами',
          'Нет гарантированной доходности или прибыли',
          'Участие связано с проектными рисками',
          'Прошлые результаты не гарантируют будущих',
        ],
      },
    ],
    finalCta: {
      title: 'Вопросы о токенизации?',
      text: 'Наша команда готова объяснить, как работают токены в экосистеме FlyANGT.',
      button: 'Связаться с нами',
    },
  },
};
